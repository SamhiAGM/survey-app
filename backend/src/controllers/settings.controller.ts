import { Request, Response } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import AuditLog from '../models/AuditLog';
import ApiKey from '../models/ApiKey';
import logger from '../utils/logger';

// @desc    Get Database Statistics
// @route   GET /api/v1/settings/database
// @access  Private/SuperAdmin
export const getDatabaseStats = async (req: Request, res: Response) => {
  try {
    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({ success: false, error: 'Database connection not available' });
    }

    const stats = await db.stats();
    
    // We can also fetch some basic counts for the UI dashboard
    const collections = await db.listCollections().toArray();
    const collectionStats = await Promise.all(collections.map(async (c) => {
      const collStats = await db.collection(c.name).stats();
      return {
        name: c.name,
        count: collStats.count,
        size: collStats.size,
        storageSize: collStats.storageSize
      };
    }));

    res.status(200).json({
      success: true,
      data: {
        dbName: stats.db,
        collections: stats.collections,
        objects: stats.objects,
        avgObjSize: stats.avgObjSize,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize,
        collectionDetails: collectionStats
      }
    });
  } catch (error: any) {
    logger.error(`Error in getDatabaseStats: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get Audit Logs
// @route   GET /api/v1/settings/audit
// @access  Private/SuperAdmin
export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (req.query.action) query.action = req.query.action;
    if (req.query.module) query.module = req.query.module;
    if (req.query.status) query.status = req.query.status;
    if (req.query.search) {
      // Basic search by user ID or IP if needed (or details stringified)
      // Since it's complex, we'll keep it simple for now
    }

    const logs = await AuditLog.find(query)
      .populate('user', 'name email role')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: logs
    });
  } catch (error: any) {
    logger.error(`Error in getAuditLogs: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get API Keys
// @route   GET /api/v1/settings/keys
// @access  Private/SuperAdmin
export const getApiKeys = async (req: Request, res: Response) => {
  try {
    const keys = await ApiKey.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: keys });
  } catch (error: any) {
    logger.error(`Error in getApiKeys: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create API Key
// @route   POST /api/v1/settings/keys
// @access  Private/SuperAdmin
export const createApiKey = async (req: Request, res: Response) => {
  try {
    const { name, expiresInDays } = req.body;
    
    // Generate a secure random key
    const rawKey = crypto.randomBytes(32).toString('hex');
    const keyPrefix = rawKey.substring(0, 8);
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    let expiresAt;
    if (expiresInDays) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expiresInDays, 10));
    }

    const apiKey = await ApiKey.create({
      name,
      keyPrefix,
      keyHash,
      createdBy: (req as any).user._id,
      expiresAt,
      status: 'Active'
    });

    // We only return the raw key ONCE upon creation
    res.status(201).json({ 
      success: true, 
      data: {
        ...apiKey.toJSON(),
        rawKey // THIS IS THE ONLY TIME THE USER SEES THE FULL KEY
      } 
    });

    // Log the action
    await AuditLog.create({
      user: (req as any).user._id,
      action: 'CREATE',
      module: 'API_KEYS',
      details: { keyName: name, keyId: apiKey._id }
    });

  } catch (error: any) {
    logger.error(`Error in createApiKey: ${error.message}`);
    res.status(400).json({ success: false, error: error.message || 'Invalid data' });
  }
};

// @desc    Revoke API Key
// @route   PUT /api/v1/settings/keys/:id/revoke
// @access  Private/SuperAdmin
export const revokeApiKey = async (req: Request, res: Response) => {
  try {
    const key = await ApiKey.findById(req.params.id);
    if (!key) {
      return res.status(404).json({ success: false, error: 'API Key not found' });
    }

    key.status = 'Revoked';
    await key.save();

    res.status(200).json({ success: true, data: key });

    // Log the action
    await AuditLog.create({
      user: (req as any).user._id,
      action: 'UPDATE',
      module: 'API_KEYS',
      details: { keyName: key.name, keyId: key._id, change: 'Revoked' }
    });
  } catch (error: any) {
    logger.error(`Error in revokeApiKey: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

import { Request, Response } from 'express';
import Facility, { IFacility } from '../models/Facility';
import logger from '../utils/logger';

// @desc    Get all facilities
// @route   GET /api/v1/facilities
// @access  Private
export const getFacilities = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (req.query.type) {
      query.type = req.query.type;
    }
    if (req.query.district) {
      query.district = req.query.district;
    }
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const facilities = await Facility.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Facility.countDocuments(query);

    res.status(200).json({
      success: true,
      count: facilities.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: facilities
    });
  } catch (error: any) {
    logger.error(`Error in getFacilities: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single facility
// @route   GET /api/v1/facilities/:id
// @access  Private
export const getFacility = async (req: Request, res: Response) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, error: 'Facility not found' });
    }
    res.status(200).json({ success: true, data: facility });
  } catch (error: any) {
    logger.error(`Error in getFacility: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new facility
// @route   POST /api/v1/facilities
// @access  Private
export const createFacility = async (req: Request, res: Response) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json({ success: true, data: facility });
  } catch (error: any) {
    logger.error(`Error in createFacility: ${error.message}`);
    res.status(400).json({ success: false, error: error.message || 'Invalid data' });
  }
};

// @desc    Update facility
// @route   PUT /api/v1/facilities/:id
// @access  Private
export const updateFacility = async (req: Request, res: Response) => {
  try {
    let facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, error: 'Facility not found' });
    }
    
    facility = await Facility.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({ success: true, data: facility });
  } catch (error: any) {
    logger.error(`Error in updateFacility: ${error.message}`);
    res.status(400).json({ success: false, error: error.message || 'Invalid data' });
  }
};

// @desc    Delete facility
// @route   DELETE /api/v1/facilities/:id
// @access  Private
export const deleteFacility = async (req: Request, res: Response) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, error: 'Facility not found' });
    }
    
    await facility.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    logger.error(`Error in deleteFacility: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

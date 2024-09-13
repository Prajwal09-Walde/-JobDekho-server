import Job from "../models/jobModel.js";
import JobType from "../models/jobTypeModel.js";


export const createJob = async (rq, rs, next) => {

    try {
        const job = await Job.create({
            title: rq.body.title,
            description: rq.body.description,
            salary: rq.body.salary,
            location: rq.body.location,
            jobType: rq.body.jobType,
            user: rq.user.id,
        });
        rs.status(201).json({
            success: true,
            job
        })
    } catch (err) {
        next(err);
    }
}

export const singleJob = async (rq, rs, next) => {
    try {
        const job = await Job.findById(rq.params.id).populate('jobType', 'jobTypeName');
        rs.status(200).json({
            success: true,
            job
        })
    } catch (err) {
        next(err);
    }
};

export const updateJob = async (rq, rs, next) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(rq.params.job_id, rq.body, { new: true })
            .populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        rs.status(200).json({
            success: true,
            updatedJob
        })
    } catch (err) {
        next(err);
    }
};

export const deleteJob = async (rq, rs, next) => {
    try {
        const job = await Job.findByIdAndDelete(rq.params.job_id);
        rs.status(200).json({
            success: true,
            message: "job deleted."
        })
    } catch (err) {
        next(err);
    }
};

export const showJobs = async (rq, rs, next) => {
    const kw = rq.query.kw ? {
        title: {
            $regex: rq.query.kw,
            $options: 'i',
        }
    } : {}


    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = rq.query.cat;
    let category = cat !== '' ? cat : ids;

    let locations = [];
    const jobByLocation = await Job.find({}, {location: 1});
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = rq.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;

    const pageSize = 10;
    const page = Number(rq.query.pageNumber) || 1;
    const count = await Job.find({...kw, jobType: category, location: locationFilter}).countDocuments();

    try {
        const jobs = await Job.find({ ...kw, jobType: category, location: locationFilter }).sort({ createdAt: -1 })
            .populate('jobType', 'jobTypeName').populate('user', 'firstName')
            .skip(pageSize * (page - 1)).limit(pageSize);
        rs.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        })
    } catch (err) {
        next(err);
    }
}
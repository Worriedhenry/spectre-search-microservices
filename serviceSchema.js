const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName: {
        type: String,
        required: [true, 'Please add a service name']
    },
    serviceBrief:{
        type: String,
        required: [true, 'Please add a service brief']
    },
    rating:{
        type: Number,
        default: 0
    },
    reviewCount:{
        type: Number,
        default: 0
    },
    complexity:{
        type:String,
        required: [true, 'Please add a complexity']
    },
    workSamples: {
        type:Array,
        default: []
    },
    serviceProvider: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Please add a service provider']
    },
    serviceTags: {
        type: Array,
        default: []
    },
    serviceReviews:[{
        type: Schema.Types.ObjectId,
        ref:'reviews'    
    }],
    serviceCostCurrency:{
        type: String,
        default: "$"
    },
    serviceCostDuration:{
        type: String,
        default: "Per Hour"
    },
    serviceCost: {
        type:Number,
        default: 0
    },
    serviceDeadline:{
        type: String,
        default:"N/A"
    },
    serviceRequested:{
        type:Number,
        default: 0
    },
    serviceCompleted:{
        type:Number,
        default: 0
    }
    });

serviceSchema.index({ serviceName: 'text', serviceTags: 'text',serviceBrief: 'text' });

module.exports = mongoose.model('services', serviceSchema);

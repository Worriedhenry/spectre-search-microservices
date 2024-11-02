const express = require('express');

const Service = require('./serviceSchema');
const User = require('./userSchema');

const app = express();

app.get('/searchname/:query', async (req, res) => {
    try {
        const query = req.params.query;

        const words = query.split(' ');

        const pipeline = [
            {
                $match: {
                    $text: { $search: query } // Search in serviceName
                }
            },
            {
                $addFields: {
                    score: {
                        $size: {
                            $setIntersection: ['$serviceTags', words] 
                        }
                    }
                }
            },
            {
                $sort: { score: -1 } 
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 0,
                    serviceName: 1
                }
            }
        ];
        const results = await Service.aggregate(pipeline);

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get("/search/:query/:page", async (req, res) => {
    const query = req.params.query;
    
    const words = query.split(' ');
    var page = req.params.page
    if (!page || page < 1) {
        page = 1
    }
    const pipeline = [
        {
            $match: {
                $text: { $search: query }, 
            }
        },
        {
            $addFields: {
                score: {
                    $size: {
                        $setIntersection: ['$serviceTags', words] // Calculate the score based on matched tags
                    }
                }
            }
        },
        {
            $sort: { score: -1 } // Sort by score in descending order
        },
        {
            $skip: (page - 1) * 5
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: "users",
                localField: "serviceProvider",
                foreignField: "_id",
                as: "serviceProvider"
            }
        },
        {
            $project: {
                _id: 1,
                serviceName: 1,
                serviceBrief: 1,
                serviceTags: 1,
                serviceCost: 1,
                serviceCostCurrency: 1,
                serviceCostDuration: 1,
                rating: 1,
                reviewCount: 1,
                serviceProvider: {
                    username: "$serviceProvider.username",
                    profilePic: "$serviceProvider.profilePic",
                    location: "$serviceProvider.location",
                    userId: "$serviceProvider._id",

                }
            }
        }
    ];

    const results = await Service.aggregate(pipeline);


    res.json(results);
})







module.exports = app;


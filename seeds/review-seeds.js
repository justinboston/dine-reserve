const { User, Restaurant, Review } = require('../models'); // Ensure paths are correct

const reviewData = [
    {
        rating: 5,
        content: 'Excellent dining experience!',
        userId: 1, // Adjust to reflect valid users and restaurants
        restaurantId: 1,
    },
    {
        rating: 4,
        content: 'Good food, but service could be faster.',
        userId: 2,
        restaurantId: 2,
    },
    {
        rating: 3,
        content: 'Mediocre overall.',
        userId: 3,
        restaurantId: 3,
    },
];

const seedReviews = async () => {
    try {
        const seededReviews = await Review.bulkCreate(reviewData, {
            returning: true,
        });

        console.log('Reviews seeded successfully:', seededReviews.map(review => review.get({ plain: true })));
    } catch (error) {
        console.error('Failed to seed reviews:', error);
    }
};

module.exports = seedReviews;

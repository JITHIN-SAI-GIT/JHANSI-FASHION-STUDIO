import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, Loader2, MessageSquare } from 'lucide-react';
import Section from '../components/ui/Section';
import { ratingService } from '../services/api';
import toast from 'react-hot-toast';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await ratingService.getAllReviews();
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 5.0;

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <Section>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4">
            Client <span className="text-amber-500">Reviews</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real stories from our clients about their Jhansi Fashion Studio experience
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="animate-spin text-amber-500" size={48} />
            <p className="text-neutral-500 animate-pulse">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center p-20 border border-neutral-800 rounded-3xl">
            <MessageSquare className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-white mb-2">No reviews yet</h3>
            <p className="text-neutral-500">Be the first to share your experience by rating our projects in the Portfolio!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-black border border-amber-500/20 hover:border-amber-500/50 transition-all p-8 relative rounded-2xl group"
              >
                <Quote className="w-12 h-12 text-amber-500/10 absolute top-4 right-4" />

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-600'}`}
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic relative z-10 font-serif">
                  "{review.comment}"
                </p>

                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-black border-2 border-amber-500/10">
                    <img
                      src={review.userId?.photo || `https://ui-avatars.com/api/?name=${review.userId?.name || 'User'}&background=linear-gradient(45deg, #f59e0b, #d97706)`}
                      alt={review.userId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{review.userId?.name || 'Verified User'}</h3>
                    <p className="text-amber-500 text-sm font-bold uppercase tracking-widest">{review.projectId?.category || 'Photography'}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-700/50 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-neutral-500">Project: {review.projectId?.title}</span>
                  <span className="text-xs text-neutral-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-8 md:p-12 text-center rounded-3xl">
            <h2 className="text-3xl font-serif mb-4">
              Share Your <span className="text-amber-500">Experience</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              We'd love to hear about your experience with Jhansi Fashion Studio. To leave a review, simply rate any project in our portfolio!
            </p>
            <Link
              to="/portfolio"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 text-sm uppercase tracking-wider font-semibold transition-all duration-300 rounded-full"
            >
              Go to Portfolio to Review
            </Link>
          </div>
        </div>
      </Section>

      <Section dark={false}>
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>
            <p className="text-4xl font-bold mb-2">{averageRating.toFixed(1)} Average Rating</p>
            <p className="text-gray-400">Based on {reviews.length} real client reviews</p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-500 mb-2">100%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-500 mb-2">98%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Repeat Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Happy Clients</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

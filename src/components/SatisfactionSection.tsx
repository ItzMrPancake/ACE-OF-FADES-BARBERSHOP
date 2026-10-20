import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { REVIEWS, SATISFACTION_METRICS } from '../data/barbershopData';

export const SatisfactionSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fade' | 'shave' | 'beard'>('all');
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({
    'rev-1': 24,
    'rev-2': 19,
    'rev-3': 15,
    'rev-4': 18,
    'rev-5': 11,
    'rev-6': 14,
  });
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const toggleHelpful = (id: string) => {
    if (userVoted[id]) {
      setHelpfulLikes((prev) => ({ ...prev, [id]: prev[id] - 1 }));
      setUserVoted((prev) => ({ ...prev, [id]: false }));
    } else {
      setHelpfulLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
      setUserVoted((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewPrompt(false);
      setReviewSubmitted(false);
      setNewReviewAuthor('');
      setNewReviewText('');
    }, 2200);
  };

  const filteredReviews = selectedCategory === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => {
        if (selectedCategory === 'fade') return r.serviceReceived.toLowerCase().includes('fade');
        if (selectedCategory === 'shave') return r.serviceReceived.toLowerCase().includes('shave') || r.serviceReceived.toLowerCase().includes('royal');
        if (selectedCategory === 'beard') return r.serviceReceived.toLowerCase().includes('beard');
        return true;
      });

  return (
    <section id="satisfaction" className="py-12 sm:py-16 lg:py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Verified Client Feedback
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-display [text-wrap:balance]">
            4.8-Star Customer Satisfaction
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Proudly keeping Wichita Falls sharp. Read authentic reviews from airmen, MSU students, and local gentlemen.
          </p>
        </div>

        {/* Highlight Scorecard Strip (Anti-slop clean layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-10">
          
          {/* Main 4.8 Rating Block */}
          <div className="md:col-span-5 flex flex-col justify-center items-center md:items-start md:border-r md:border-neutral-800 md:pr-8 text-center md:text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black font-display text-white tabular-nums">
                {SATISFACTION_METRICS.rating}
              </span>
              <span className="text-xl sm:text-2xl text-neutral-500 font-display">/ 5.0</span>
            </div>

            {/* Stars row */}
            <div className="flex items-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-amber-400/80 text-amber-400/80'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
              Based on <span className="text-white font-bold tabular-nums">101</span> verified Google & local reviews
            </div>
            
            <div className="mt-3 text-xs text-neutral-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>94% of clients rate 5 stars and rebook monthly</span>
            </div>

            <button
              onClick={() => setShowReviewPrompt(true)}
              className="mt-5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
              <span>Leave a Wichita Falls Review</span>
            </button>
          </div>

          {/* Metric Sub-scores */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4 md:pl-4">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Experience Ratings Breakdown
            </div>
            <div className="space-y-3">
              {SATISFACTION_METRICS.breakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm text-neutral-200">
                    <span>{item.label}</span>
                    <span className="font-semibold text-amber-400 tabular-nums">{item.score} / 5.0</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(item.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Review Filter Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Feedback ({REVIEWS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('fade')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'fade'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Skin Fades
            </button>
            <button
              onClick={() => setSelectedCategory('beard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'beard'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Beard Trims
            </button>
            <button
              onClick={() => setSelectedCategory('shave')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'shave'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Hot Towel Shaves
            </button>
          </div>

          <div className="text-xs text-neutral-400">
            Verified visits at 1512 Harrison St
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Header: Stars + Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">{rev.date}</span>
                </div>

                {/* Body Text */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* Author & Service Metadata (Zero pill unboxed) */}
              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-end justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span title="Verified Customer" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                    <span>{rev.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400/90">{rev.serviceReceived}</span>
                  </div>
                </div>

                {/* Helpful count button */}
                <button
                  onClick={() => toggleHelpful(rev.id)}
                  className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors cursor-pointer ${
                    userVoted[rev.id]
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-neutral-400 hover:text-white bg-neutral-800/60'
                  }`}
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="tabular-nums">{helpfulLikes[rev.id] || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal Dialog */}
      {showReviewPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white font-display uppercase">
              Review Ace of Fades
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Share your haircut or beard grooming experience at our 1512 Harrison St shop.
            </p>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <div className="text-base font-bold text-white">Thank you for your feedback!</div>
                <div className="text-xs text-neutral-400">Your review will be verified and posted shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Mason B."
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="How was your fade, beard trim, or hot towel shave?"
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewPrompt(false)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

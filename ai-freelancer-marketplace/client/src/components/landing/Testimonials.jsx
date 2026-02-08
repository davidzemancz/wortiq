import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Co říkají naši uživatelé
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Přečtěte si, jak platforma pomáhá klientům i freelancerům.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 3).map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card className="p-6 h-full flex flex-col" hover>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-blue-200" aria-hidden="true" />
                  {testimonial.projectType && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                      {testimonial.projectType}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 flex-1 mb-6 leading-relaxed">
                  „{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar name={testimonial.name} src={testimonial.avatar} size="md" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3" aria-label={`${testimonial.rating || 5} z 5 hvězdiček`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < (testimonial.rating || 5) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import { exampleProjects } from '../../data/exampleProjects';

export default function ExamplePrompts({ onSelect }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-slate-900">
          Inspirujte se příklady
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exampleProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className="cursor-pointer group"
              onClick={() =>
                onSelect(project.prompt, project.categories, project.budget)
              }
            >
              <CardBody>
                <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.categories.map((cat) => (
                    <Badge key={cat} color="blue" className="text-[11px]">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

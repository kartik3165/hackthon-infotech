import { Link } from 'react-router-dom';

export default function ProjectCard({ project, variant = 'ongoing' }) {
    return (
        <Link
            to={`/projects/${project.slug}`}
            className="project-card group relative overflow-hidden block bg-white border border-charcoal/10 hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-700"
        >
            <div className="overflow-hidden h-64">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-105"
                />
            </div>
            <div className="p-6">
                {variant === 'ongoing' && (
                    <span className="project-badge inline-block bg-gold/10 text-gold text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-4 opacity-0 transition-opacity duration-500">
                        {project.status || 'Ongoing'}
                    </span>
                )}
                {variant === 'completed' && (
                    <span className="project-badge inline-block bg-charcoal/5 text-charcoal text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-4 opacity-0 transition-opacity duration-500">
                        Completed
                    </span>
                )}
                <h3 className="font-serif text-2xl text-charcoal mb-2 group-hover:text-gold transition-colors duration-500">
                    {project.title}
                </h3>
                <p className="text-charcoal/50 text-sm mb-4">{project.location}</p>
                <div className="flex justify-between items-center border-t border-charcoal/10 pt-4">
                    <div className="project-pricing opacity-0">
                        <span className="text-[10px] uppercase tracking-widest text-charcoal/40 block">Starting From</span>
                        <span className="text-gold font-bold text-lg">{project.price}</span>
                    </div>
                    <span className="project-link text-[10px] uppercase tracking-widest text-charcoal font-bold border-b border-transparent pb-0.5 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-gold group-hover:text-gold group-hover:after:w-full after:transition-all after:duration-500 transition-colors">
                        View Project →
                    </span>
                </div>
            </div>
        </Link>
    );
}

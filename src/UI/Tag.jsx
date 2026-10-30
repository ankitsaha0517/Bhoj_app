const Tag = ({title}) => {
  return (
    <span className="rounded-full bg-white/5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sage border border-white/10 backdrop-blur-md">
      {title}
    </span>
  );
};

export default Tag;

export default function AuraImage({ src, alt = 'Profile', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  )
}

import React from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  } | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showFallback?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  className = '',
  showFallback = true
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  // Get initials from name
  const getInitials = (name?: string): string => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Generate consistent color based on email or name
  const getBackgroundColor = (identifier?: string): string => {
    if (!identifier) return 'bg-gray-500';

    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];

    let hash = 0;
    for (let i = 0; i < identifier.length; i++) {
      hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const hasAvatar = user?.avatar && user.avatar.trim() !== '';
  const initials = getInitials(user?.name);
  const backgroundColor = getBackgroundColor(user?.email || user?.name);

  return (
    <div className={`${sizeClasses[size]} ${className} relative inline-flex items-center justify-center rounded-full overflow-hidden`}>
      {hasAvatar ? (
        <>
          <img
            src={user.avatar}
            alt={user.name || 'User avatar'}
            className="h-full w-full object-cover"
            onError={(e) => {
              // Hide image on error and show fallback
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.style.display = 'flex';
              }
            }}
          />
          {/* Fallback element (hidden by default) */}
          <div
            className={`absolute inset-0 hidden items-center justify-center text-white font-medium ${backgroundColor}`}
            style={{ display: 'none' }}
          >
            {initials || (showFallback && <User className={iconSizes[size]} />)}
          </div>
        </>
      ) : initials ? (
        <div className={`h-full w-full flex items-center justify-center text-white font-medium ${backgroundColor}`}>
          {initials}
        </div>
      ) : showFallback ? (
        <div className={`h-full w-full flex items-center justify-center text-white ${backgroundColor}`}>
          <User className={iconSizes[size]} />
        </div>
      ) : (
        <div className="h-full w-full bg-gray-200"></div>
      )}

      {/* Online indicator (optional) */}
      {size !== 'sm' && (
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

export default UserAvatar;
import { cn } from '@/lib/utils';


interface PageLoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  variant?: 'full' | 'partial';
  className?: string;
}

const PageLoadingOverlay = ({ 
  isVisible, 
  message = 'Loading...', 
  variant = 'full',
  className 
}: PageLoadingOverlayProps) => {
  if (!isVisible) return null;

  const overlayClasses = variant === 'full' 
    ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm'
    : 'absolute inset-0 z-10 bg-background/60 backdrop-blur-sm';

  return (
    <div className={cn(overlayClasses, className)}>
      <div className="flex items-center justify-center min-h-full">
        <div className="text-center space-y-4 p-8 rounded-lg bg-card/90 border shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{message}</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we load your content
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoadingOverlay;
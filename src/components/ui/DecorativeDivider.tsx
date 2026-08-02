import React from 'react'

function DecorativeDivider(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center gap-2" aria-hidden="true">
      <span className="h-px w-8 bg-primary/60" />
      <span className="size-1.5 rotate-45 bg-primary" />
      <span className="h-px w-8 bg-primary/60" />
    </div>
  );
}

export default DecorativeDivider
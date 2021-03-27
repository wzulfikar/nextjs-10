/**
 * Get css class for FullPageContainer.
 * By default, `bgColor` is not specified.
 */
export const className = ({ bgColor = '' } = {} as any) =>
  `${bgColor} h-screen flex flex-col xy-center`;

export default function FullPageContainer({
  bgColor = undefined,
  children,
  ...props
}) {
  return (
    <div className={className({ bgColor })} {...props}>
      {children}
    </div>
  );
}

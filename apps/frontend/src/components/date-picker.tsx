export function DatePicker(
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return <input type="date" className="p-2 invalid:border-red-500" {...props} />;
}

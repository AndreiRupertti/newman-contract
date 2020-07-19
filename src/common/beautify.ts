import { js as format } from "js-beautify";

const formatterOptions: JSBeautifyOptions = {
  eol: "\n",
  end_with_newline: true,
  indent_size: 2,
  preserve_newlines: true,
  brace_style: "preserve-inline",
};

export default (code: string) => {
  return format(code, formatterOptions);
};

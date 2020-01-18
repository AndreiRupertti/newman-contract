// @ts-ignore
import { js as format } from "js-beautify";

const formatterOptions: JsBeautifyOptions = {
  indent_size: 2,
  eol: "\n",
  preserve_newlines: true,
  brace_style: "collapse-preserve-inline",
  end_with_newline: true,
};

export default (code: string) => {
  return format(code, formatterOptions);
};

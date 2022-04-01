class FormatService {
  truncate(value: string, len: number) {
    if (value.length <= len) {
      return value;
    }

    value = value.slice(0, len) + "...";

    return value;
  }
}

export default FormatService;

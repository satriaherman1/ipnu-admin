class FormatService {
  truncate(value: any, len: number) {
    if (value.length <= len) {
      return value;
    }

    value = value.slice(0, len) + "...";

    return value;
  }

  setCookie(cname: string, cvalue: any, exdays: any) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(name: string) {
    var nameEQ = name + "=";
    if (process.browser) {
      var ca = document?.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
}

export default FormatService;

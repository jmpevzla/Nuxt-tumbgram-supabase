export function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
}

export function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  const jvalue = JSON.stringify(cvalue)

  document.cookie = cname + "=" + jvalue + ";" + expires + ";SameSite=None; Secure; path=/";
}

export function ipv4ToLong(ip: string = "") {
  return ip.split(".").reduce((t, n) => t * 256 + parseInt(n), 0);
}


const NAMESPACE = "_promptconfig"

export default (string) => {
  return `${NAMESPACE}_${string}`
}

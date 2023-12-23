export function formatFeatureName(featureName: string): string {
  return featureName.toLowerCase().replace(/ /g, "_");
}

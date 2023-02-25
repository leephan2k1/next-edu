export function checkFileType(nameWithExtension?: string | null) {
  if (!nameWithExtension) return;

  if (
    ['.doc', '.docx', '.pptx', '.xlxs', '.txt'].some((e) =>
      nameWithExtension.includes(e),
    )
  ) {
    return 'document';
  }

  if (['.mp4'].some((e) => nameWithExtension.includes(e))) {
    return 'video';
  }
}

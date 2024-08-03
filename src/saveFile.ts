export const saveFile = (name: string, data: string) => {
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.svg`;
    a.click(); a.remove();
    URL.revokeObjectURL(url);
}
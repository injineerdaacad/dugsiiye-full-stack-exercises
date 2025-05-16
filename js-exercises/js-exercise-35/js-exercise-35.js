const image = document.querySelector("#image");

function changeImage() {
  const url = prompt("Halkaan soo geli sawir-ka URL-kiisa?");
  const borderColor = prompt("Halkaan soo geli midab-ka border-kaaga?");
  const width = prompt("Halkaan soo geli sawirka balaciisa pixels ahaan?");
  const height = prompt("Halkaan soo geli sawirka dhererkiisa pixels ahaan?");
  const borderRadius = prompt(
    "Halkaan soo geli sawirka border radius-kiisa pixels ahaan?"
  );

  image.setAttribute("src", url);
  image.style.border = `5px solid ${borderColor}`;
  image.style.width = `${width}px`;
  image.style.height = `${height}px`;
  image.style.borderRadius = `${borderRadius}px`;
}

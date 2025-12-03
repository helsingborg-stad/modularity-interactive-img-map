document.addEventListener("DOMContentLoaded", () => {
	categories();
	var checkboxes = document.getElementsByName(
		"mod-interactive-map-category-checkbox",
	);
	if (checkboxes.length > 0) {
		checkboxes[0].checked = true;
		checkboxes[0].dispatchEvent(new Event("change"));
	}
});

function categories() {
	var activeCategories = [];
	var checkboxes = document.querySelectorAll(
		"input[name=mod-interactive-map-category-checkbox]",
	);
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			var category = checkbox.getAttribute("data-interactive-map-category");
			if (checkbox.checked) {
				activeCategories.push(category);
			} else {
				activeCategories.splice(activeCategories.indexOf(category), 1);
			}
			var pinsLayers = document.querySelectorAll(
				"[data-interactive-map-category-name]",
			);
			pinsLayers.forEach((pin) => {
				var keys = pin.getAttribute("data-interactive-map-category-name");
				keys = keys.split("|");
				if (!keys.some((r) => activeCategories.indexOf(r) >= 0)) {
					pin.classList.remove("pin-visible");
				} else {
					pin.classList.add("pin-visible");
				}
			});
		});
	});
}

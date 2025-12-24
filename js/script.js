let filterHtml = document.querySelector(".filter-container")
let imageInput = document.querySelector("#input-image")
let canvas = document.querySelector("#imageCanvas")
let canvasContext = canvas.getContext("2d")
let imagePlaceholder = document.querySelector(".placeholder")
let resetBtn = document.querySelector("#reset-btn")
let downloadBtn = document.querySelector("#download-btn")
let presetContainer = document.querySelector(".preset-container")
let right = document.querySelector(".right")
let file = null
let image = null


let filters = {

    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },

    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },

    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },

    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
    },

    grayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },

    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },

    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },

    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
}

function createFilterElement(name, value, min, max, unit = "%") {

    let div = document.createElement("div")
    div.classList.add("filters")
    
    let div2 = document.createElement("div")
    div2.classList.add("div2")

    let divp = document.createElement("div")
    divp.innerText = name

    let divv = document.createElement("div")
    divv.innerText = value + unit

    let input = document.createElement("input")
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name

    div.appendChild(div2)
    div.appendChild(input)

    input.addEventListener("input", (e) => {
        filters[name].value = input.value
        divv.innerText = filters[name].value + unit
        applyFilters()
    })

    
    div2.appendChild(divp)
    div2.appendChild(divv)

    return div

}

function createFilter() {
    Object.keys(filters).forEach(key => {
        let filtterElement = createFilterElement(key, filters[key].value, filters[key].min, filters[key].max, filters[key].unit)

        filterHtml.appendChild(filtterElement)
    })
}

createFilter()

imageInput.addEventListener("change", (e) => {
    let file = e.target.files[0]
    const img = new Image()
    img.src = URL.createObjectURL(file)
    canvas.style.display = "block"
    imagePlaceholder.style.display = "none"

    img.onload = () => {
        image = img
        canvas.width = img.width;
        canvas.height = img.height;
        canvasContext.drawImage(image, 0, 0)
        if (image) {
            right.style.display = "flex"
        }
    }

})

function applyFilters() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    canvasContext.filter = `
                brightness(${filters.brightness.value}${filters.brightness.unit})
                contrast(${filters.contrast.value}${filters.contrast.unit})
                saturate(${filters.saturation.value}${filters.saturation.unit})
                hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
                blur(${filters.blur.value}${filters.blur.unit})
                grayscale(${filters.grayScale.value}${filters.grayScale.unit})
                sepia(${filters.sepia.value}${filters.sepia.unit})
                opacity(${filters.opacity.value}${filters.opacity.unit})
                invert(${filters.invert.value}${filters.invert.unit})
    `.trim()
    canvasContext.drawImage(image, 0, 0)
}

resetBtn.addEventListener("click", () => {
    if (image) {
        confirm("Do you really want to reset all settings?")
        if (confirm) {
            filters = {

                brightness: {
                    value: 100,
                    min: 0,
                    max: 200,
                    unit: "%",
                },

                contrast: {
                    value: 100,
                    min: 0,
                    max: 200,
                    unit: "%",
                },

                saturation: {
                    value: 100,
                    min: 0,
                    max: 200,
                    unit: "%",
                },

                hueRotation: {
                    value: 0,
                    min: 0,
                    max: 360,
                    unit: "deg",
                },

                blur: {
                    value: 0,
                    min: 0,
                    max: 20,
                    unit: "px",
                },

                grayScale: {
                    value: 0,
                    min: 0,
                    max: 100,
                    unit: "%",
                },

                sepia: {
                    value: 0,
                    min: 0,
                    max: 100,
                    unit: "%",
                },

                opacity: {
                    value: 100,
                    min: 0,
                    max: 100,
                    unit: "%",
                },

                invert: {
                    value: 0,
                    min: 0,
                    max: 100,
                    unit: "%",
                },
            }
            applyFilters()

            filterHtml.innerHTML = ""
            createFilter()
        }
    } else {
        alert("Please choose an image")
    }
})

downloadBtn.addEventListener("click", () => {
    if (image) {
        let link = document.createElement("a")
        link.download = "edited-image.png"
        link.href = canvas.toDataURL()
        link.click()
    } else {
        alert("Please choose an image first")
    }
})

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    vivid: {
        brightness: 110,
        contrast: 120,
        saturation: 140,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 105,
        contrast: 110,
        saturation: 120,
        hueRotation: 10,
        blur: 0,
        grayScale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 98,
        contrast: 110,
        saturation: 90,
        hueRotation: 340, // subtle blue shift
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    dramatic: {
        brightness: 90,
        contrast: 150,
        saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    blackAndWhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayScale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 95,
        contrast: 110,
        saturation: 90,
        hueRotation: 0,
        blur: 1,
        grayScale: 10,
        sepia: 40,
        opacity: 100,
        invert: 0,
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 85,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 10,
        opacity: 90,
        invert: 0,
    },
    cyberpunk: {
        brightness: 105,
        contrast: 145,
        saturation: 160,
        hueRotation: 320, // neon magenta-blue shift
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
};

Object.keys(presets).forEach(presetName => {
    let presetBtn = document.createElement("button")
    presetBtn.classList.add("btn")
    presetBtn.innerText = presetName
    presetContainer.appendChild(presetBtn)

    presetBtn.addEventListener("click", () => {

        if (image) {
            let preset = presets[presetName]
            Object.keys(preset).forEach(filterName => {
                filters[filterName].value = preset[filterName]
            })
            applyFilters()
            filterHtml.innerHTML = ""
            createFilter()
        }

        else {
            alert("Please choose an image first")
        }

    })
})



function fixVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

fixVH();
window.addEventListener('resize', fixVH);

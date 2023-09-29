import { existsSync, readFileSync, writeFileSync } from "fs"


const newsletterPath = "newsletter.json"

if(!existsSync(newsletterPath)) {
    console.error("No newsletter.json file found!")
    process.exit(0)
}


let newsletter

try {
    newsletter = JSON.parse(
        readFileSync('newsletter.json')
    )   
} catch (error) {
    console.error("Error reading or parsing newsletter.json file")
    console.error(error)
    process.exit(0)
}


const items = []

// Generate items
newsletter?.items.map(item => {

    if(!item?.name || !item?.description) {
        console.error("All items must have a name and a description")
        process.exit(0)
    }

    items.push(`
        <tr>
            <td>
                <table bgcolor="#1c1c1c" style="background:#292929; border-radius: 6px;" role="presentation" border="0" cellpadding="18" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                ${
                                    // Image?
                                    item?.image ? (
                                        `<tr>
                                            <td>
                                                <img width="100%" src="${item.image}">
                                            </td>
                                        </tr>`
                                    ) : (
                                        ''
                                    )
                                }
                                <tr>
                                    <td>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td width="100%">
                                                    <h3 style="color: #ffffff;">${item?.name}</h3>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <hr style="border-color: #747474;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>${item?.description}</p>
                                    </td>
                                </tr>
                                ${
                                    // Image?
                                    item?.link ? (
                                        `<tr>
                                            <td>
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td align="left">
                                                            <a href='${item.link}' style="padding: 12px; background-color: #5efe00; color: #212121; font-weight: 600;">${item?.linkText ? item.linkText : 'Learn More'}</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>`
                                    ) : (
                                        ''
                                    )
                                }

                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `)
})


const heading = `
    <h1>${newsletter?.title}</h1>
    <p>${newsletter?.forward}</p>
`


const template = `
<!DOCTYPE html>
<html>
    <style>
        * {
            box-sizing: border-box;
        }
    </style>
  <body style="color: #f6f6f6; font-size: 1rem; font-family: sans-serif; line-height: 140%; width: 100%;" width="100%">
    <table style="background-color: #f6f6f6;" width="100%">
        <tr>
            <td align="center">
                <table style="background-color:#141414; max-width: 600px; margin: auto;" role="presentation" border="0" cellpadding="12" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <img src="https://edigital.org.uk/static/excs/top.jpg" width="100%" alt="EXCS logo and name">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br>
                                ${heading}
                            <br>
                        </td>
                    </tr>
                    ${
                        items.join('<br>')
                    }
                    <tr>
                        <tr>
                            <td>
                                <img src="https://edigital.org.uk/static/excs/btm.jpg" width="100%" alt="Bottom Line">
                            </td>
                        </tr>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
  </body>
</html>
`

writeFileSync("newsletter.html", template)

console.log("Newsletter saved to newsletter.html")
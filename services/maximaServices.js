const cheerio= require("cheerio");

const maximaDiscounts = (response) => {
    let discounts = [];
    const html = response.data;
    if(response.status==200) {
        const cheer = cheerio.load(html);

        const datarow = cheer(".offer-card");

        datarow.toArray().forEach(element => {
            
            const tmp = cheerio.load(element);

            const title = tmp(".offer-card").find("h4").text().replace(/(\r\n|\n|\r)/gm, '').trim();
            let price = tmp(".offer-card").find(".price-wrapper").text().replace(/\s{2,}|(\r\n|\n|\r)/gm, ' ').trim();
            const image = tmp(".offer-card").find("img").attr("data-src");
            let discount = tmp(".offer-card").find(".discount-icon").text();
            const card = tmp(".offer-card").find(".offer-bottom-icon-wrapper").find("img").attr("src") ? true : false;
            price = price.replace(/[€]/g, '$& ').replace(/\s/, ',').trim(); 
            discount = discount.replace(/(\r\n|\n|\r)/gm, '').trim();

            if(discount.length > 3){
                discounts.push({
                    title: title,
                    price: price,
                    img: image,
                    discount: discount,
                    cardNeeded: card,
                });
            }
            else {
                discounts.push({
                    title: title,
                    price: price,
                    img: image,
                    cardNeeded: card,
                });
            }

        });
    }
    return discounts;
}

module.exports = {
    maximaDiscounts,
}
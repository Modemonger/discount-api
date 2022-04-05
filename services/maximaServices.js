const cheerio= require("cheerio");

const maximaDiscounts = (response) => {
    let discounts = [];
    const html = response.data;
    if(response.status==200) {
        const cheer = cheerio.load(html);

        const datarow = cheer(".swiper-slide");
        const output = datarow.find("h4").toArray();
        let index = 0;
        output.forEach(element => {
            if(element.children[0].data){
                const title = element.children[0].data.replace(/(\r\n|\n|\r)/gm, '').trim();
                const price = datarow.find(".price-eur").eq(index).text() + "," + datarow.find(".price-cents").eq(index).text();
                const img = datarow.find(".offer-image").find("img").eq(index).attr('data-src');
                ++index;
                discounts.push({
                    title: title,
                    price: price,
                    img: img,
                })
            }
        });
    }
    return discounts;
}

module.exports = {
    maximaDiscounts,
}
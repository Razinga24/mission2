/// <reference path="jquery-3.7.0.js"/>


$(() => {

    $("#loadCountries").on("click", loadCountries );

    async function loadCountries(){
        try{
            const countries = await getJson("https://restcountries.com/v3.1/all");
            displayCountries(countries);
             displayRegions(countries);
            displayStats(countries);
        }
        catch(err){
            alert(err.message);
        }
         
    }

    $("#search").on("click", async () => {
        const textToSearch = $("#searchBox").val();
        const countries = await getJson("https://restcountries.com/v3.1/name/" + textToSearch );
        displayCountries( countries );
        displayRegions(countries)
        displayStats( countries );
    });

    function displayCountries(countries){

        let content =`
                <thead>
                    <th>Country Name</th>
                    <th>Number of Citizens</th>
                </thead>
                `;
        for(const country of countries){
            content += getCountryHtml(country);
        }
        $("#countryTable").html(content);
    }

    


    function displayStats(countries){

        let number = countries.length;
        let sum = 0;
        let avg = 0;

        for(const country of countries){
            sum += country.population;

        }

        avg = sum / countries.length;

        $("#stats").html(`
                <ul>
                    <li>Number of Countries: ${number}</li>
                    <li> Sum of citizens: ${sum}</li>
                    <li>Avg of citizens: ${avg}</li>
                </ul>
        `)
    }

    function getCountryHtml(country){
        return `
            <tbody>
                <td>${country.name.common}</td>
                <td>${country.population}</td>
            </tbody>
        `
    }
    function displayRegions(countries) {
        let region = {
            Europe: 0,
            Africa: 0,
            Oceania: 0,
            Americas: 0,
            Antarctic: 0,
            Asia: 0,
        };
    
        for (const country of countries) {
            region[country.region]++;
        }
    
        let content = `<thead>
                    <tr>
                        <th>Region</th>
                        <th>Number of Countries</th>
                    </tr>
                    </thead>`;
        for (const key in region){
            if( region[key] === 0){
                continue ;
            }
                content += `
                    <tbody>
                    <tr>
                        <td>${key}</td>
                        <td>${region[key]}</td>
                    </tr
                    </tbody>
                    >
                `;
            
        }
    
        $("#regionTable").html(content);
    }
    




    function getJson( url ){
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                success: data => resolve(data),
                error: err => reject(err),
            });
        });
    }

});
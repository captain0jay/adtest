document.addEventListener("DOMContentLoaded", function () {
    // Function to check if the ad blocker is enabled
    async function isKangarooBlocked() {
        let koalaBlocked;

        if (window.Ayo === undefined) {
            console.log(`Prebid ads work: ${window.Ayo}`);;
            koalaBlocked = true;
        } else if(koalaBlocked === false){
            const testGiraffe = document.createElement("div");
            testGiraffe.innerHTML = "&nbsp;";
            testGiraffe.className = "adsbox";
            document.body.appendChild(testGiraffe);
            koalaBlocked = testGiraffe.offsetHeight === 0;
            document.body.removeChild(testGiraffe);
        }else{
            async function detectAdBlock() {
                let adBlockEnabled = false;
                const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                try {
                  await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true);
                } catch (e) {
                  adBlockEnabled = true;
                } finally {
                  console.log(`AdBlock Enabled: ${adBlockEnabled}`)
                }
                return adBlockEnabled;
            }
    
            koalaBlocked = await detectAdBlock();    
        }

        console.log(`Kangaroo Blocked: ${koalaBlocked}`);
        return koalaBlocked;
    }

    // Function to remove the second half of the blog content
    function removeSecondHalf() {
        const blogContent = document.getElementById("blog-content");
        const childElements = blogContent.children;

        if (isKangarooBlocked()) {
            const halfPoint = Math.ceil(childElements.length / 2);
            for (let i = halfPoint; i < childElements.length; i++) {
                blogContent.removeChild(childElements[i]);
            }
        }

        return 0;
    }

    // Function to display a message card
    function displayHiMessage() {
        const hiMessage = document.createElement("div");
        hiMessage.id = "himessage";
        hiMessage.innerHTML =
            "<p>This is the first half of the blog. Unfortunately, the second half has been blocked because it seems you are using an ad blocker. Please consider disabling it to view the full content.</p>";
        hiMessage.className = "himessage";
        document.body.appendChild(hiMessage);
    }

    // Remove the second half and display the message card
    async function main() {
        let istruefalse = await isKangarooBlocked();
        console.log(`Prebid ads work: ${istruefalse}`);
        if(istruefalse == true){
            await removeSecondHalf();
            displayHiMessage();
        }
    }

    main();
});

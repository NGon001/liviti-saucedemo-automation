import { Locator, Page } from "@playwright/test";
import path from 'path';
import { getEnv } from "./Tools";

export class BasePage{
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    };

    async goto(path: string = ""){
        await this.page.goto(await getEnv("BASE_URL") + path);
    }

    async goBack(){
        this.page.goBack();
    }

    async scrollToElement(element: Locator){
        const handle = await element.elementHandle();
        if(!handle){
            throw new Error("Element not found to scroll to");
        }
        await this.page.evaluate((element) => {
             element?.scrollIntoView({ behavior: 'smooth', block: 'start' }); //same as "((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'start'});", element);"
        }, await handle);
    }

    async storeLoginDataToLocalStorage(){
        await this.page.context().storageState({ path:  path.join(__dirname, await getEnv("USERDATA_PATH"))});
    };
};
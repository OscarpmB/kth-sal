from bs4 import BeautifulSoup
import requests

class scraper():

    def test(self):

        URL = "https://www.geeksforgeeks.org/data-structures/"
        r = requests.get(URL)
        print(r.content)



def main():
    s = scraper()
    s.test()

if __name__== "__main__":
    main()
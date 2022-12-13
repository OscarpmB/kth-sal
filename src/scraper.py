from bs4 import BeautifulSoup
import requests

class scraper():

    def test(self):

        URL = "https://www.geeksforgeeks.org/data-structures/"
        r = requests.get(URL)
        print(r.content)
    
    def get_bookings(self, URL: str, date: str)-> list:
        """
        Function should retrive all the times a given room is booked for a certain date
        ---
        Args:
            URL: string representation of correct url to timeEdit for specific room
            date: the date for which to find bookings.
        Returns:
            A list of touples with infomrations about booked sessions for given room
        """
        r = requests.get(URL)
        ## Fetch the information about bokings that day
        soup = BeautifulSoup(r.content, 'html.parser').find('div', attrs={'class':'weekDiv', 'data-dates':date})
        print(soup.prettify())
        times = []
        for booking in soup.find_all('div', attrs={'class':'timeDiv'}):
            times.append(booking.text)
        # print(times)
        
        booked_slots = []
        for i in range(0, len(times)):
            if (i % 2) == 1:
                continue
            booked_slots.append((times[i+1],times[i]))
        print(booked_slots)

        return booked_slots



def main():
    s = scraper()
    # e33 = "https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7401Y8YQ1.html"
    e33 = "https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7401Y8YQ1.html"
    v34 = "https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv77077gZ6y7Y7404Y8YQ1.html"
    date = "20221213"
    s.get_bookings(e33, date)
    s.get_bookings(v34, date)


if __name__== "__main__":
    main()
import requests
from bs4 import BeautifulSoup

output = 'Movies of the week:\n'

url = "https://www.cinelandia.it/le-nostre-sale/cinema-como.html"
page = requests.get(url)

soup = BeautifulSoup(page.content, "html.parser")

#titles = soup.find_all('td', colspan = 5)

titles1 = soup.select('a[href*="/film/film-in-sala/"]')
titles2 = soup.select('a[href*="/film/prossime-uscite-film/"]')
filtered_text1 = [title.text for title in titles1]
filtered_text2 = [title.text for title in titles2]

for text in filtered_text1:
    output += text + '\n'
for text in filtered_text2:
    output += text + '\n'

print(output)
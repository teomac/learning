import requests
from bs4 import BeautifulSoup

from email.message import EmailMessage
import smtplib

output = 'Movies of the week:\n\n'

url = "https://www.cinelandia.it/le-nostre-sale/cinema-como.html"
page = requests.get(url)

soup = BeautifulSoup(page.content, "html.parser")

titles1 = soup.select('a[href*="/film/film-in-sala/"]')
titles2 = soup.select('a[href*="/film/prossime-uscite-film/"]')
filtered_text1 = [title.text for title in titles1]
filtered_text2 = [title.text for title in titles2]

for text in filtered_text1:
    output += text + '\n'
for text in filtered_text2:
    output += text + '\n'

print(output)

sender = "pythonproj5@outlook.com"
recipient = "andreaportaliwings@gmail.com"
message = output

email = EmailMessage()
email["From"] = sender
email["To"] = recipient
email["Subject"] = "Movies of the week TEST"
email.set_content(message)

smtp = smtplib.SMTP("smtp-mail.outlook.com", port=587)
smtp.starttls()
smtp.login(sender, "password")
smtp.sendmail(sender, recipient, email.as_string())
smtp.quit()
1. [[#Co jsou baterie|Co jsou baterie]]
	1. [[#Alkalické baterie|Alkalické baterie]]
	2. [[#Olověné akumulátory|Olověné akumulátory]]
	3. [[#NiMH akumulátory|NiMH akumulátory]]
	4. [[#Li-ion akumulátory|Li-ion akumulátory]]
	5. [[#Li-Pol akumulátory|Li-Pol akumulátory]]
2. [[#Jak probíhá cyklus nabíjení a vybíjení|Cyklus nabíjení a vybíjení]]
	1. [[#Vybíjecí cyklus|Vybíjení]]
	2. [[#Nabíjecí cyklus|Nabíjení]]
3. [[#Jak na udržitelné zacházení s bateriemi|Jak se starat o baterie]]
	1. [[#Mám Android|Pro Android]]
	2. [[#Mám Apple (iOS)|Pro iOS]]
	3. [[#Mám Windows|Pro Windows]]
	4. [[#Mám MacOS|Pro MacOS]]
	5. [[#Mám Linux|Pro Linux]]
4. [[#Krátký komentář k budoucnosti baterií v EU|Budoucnost akumulátorů v EU]]


[[Praxe]]
## Co jsou baterie
---
Baterie jsou elektrochemická zařízení, která slouží k uchovávání elektrické energie. Oproti ostatním způsobům ukládání energie se vyznačují svou malou velikostí. Právě díky tomu je dnes najdeme v kapse téměř každého z nás (v chytrých telefonech), ale i ve spoustě jiných domácích zařízení.

Každá baterie je složena ze čtyř částí: katody, anody, elektrolytu a separátoru. Právě konkrétní kombinace materiálů použitých pro výrobu anody a katody určuje, o jaký typ baterie se jedná a jaké bude mít výsledné vlastnosti.

V odborné literatuře se rozlišuje mezi bateriemi a akumulátory. Baterie (primární článek) je jednorázový zdroj energie. Akumulátor (sekundární článek) lze znovu nabíjet [^a].

[^a]: Původně označovalo slovo baterie sestavu několika článků (např. olověná autobaterie jich má šest), ale v běžné řeči se tento pojem vžil i pro samostatné články.
#### Alkalické baterie
Tyto běžné jednorázové baterie jsou velmi levné, snadno dostupné a mají vynikající skladovatelnost. Využívají se pro nízký dlouhodobý odběr, jako jsou dálkové ovladače nebo nástěnné hodiny. Hlavní nevýhodou je jednorázovost a nebezpečí vytečení chemikálií při dlouhodobém vybití. Zcela selhávají v přístrojích s vysokým nárazovým odběrem energie.

#### Olověné akumulátory
Jsou robustní, spolehlivé a cenově dostupné. Dokáží vydat obrovské množství energie v jednom krátkém okamžiku (zapalování motoru auta). Daní je jejich extrémní hmotnost a velké rozměry. Obsahují toxické látky a jsou vysoce citlivé na úplné vybití, které je může nevratně poškodit.

#### NiMH akumulátory
Vytvářejí skvělou ekonomickou a ekologickou náhradu klasických tužkových baterií, protože je lze použít opakovaně a netrpí tak silným paměťovým efektem jako starší technologie. Hlavní slabinou je postupné samovybíjení. V porovnání s lithiovými alternativami mají nižší hustotu energie (pro stejnou kapacitu musí být těžší).

#### Li-ion (Lithium-iontové) akumulátory
V současnosti jde o standard chytrých telefonů a notebooků. Vynikají nízkou hmotností, měrnou kapacitou a minimálním samovybíjením. Netrápí je paměťový efekt. Oproti ostatním alternativám jsou ale nejnebezpečnější. Také trpí přirozeným stárnutím a špatným snášením extrémních teplot, zejména silného mrazu při nabíjení.

#### Li-Pol akumulátory
Od Li-ion se liší gelovým elektrolytem (ne kapalným). Dají se proto vyrábět v extrémně tenkých, lehkých a flexibilních tvarech na míru. Jsou ale dražší a vysoce náchylné na mechanické poškození nebo přebití. Na konci životnosti nebo při poškození mají tendenci se nafukovat.

## Jak probíhá cyklus nabíjení a vybíjení
---
Při nabíjení i vybíjení dochází k elektrochemickému procesu. Vně baterie teče zátěží proud elektronů. Uvnitř baterie se tento obvod uzavírá přesunem iontů mezi elektrodami (přes elektrolyt).

#### Vybíjecí cyklus
Průběh vybíjení (závislost napětí na čase tzv. vybíjecí křivku) ovlivňují následující faktory:
- Chemické složení (tedy __typ článku__).
- Velikost zátěže (tedy __odběr proudu__).
- __Teplota__
- __Stáří a opotřebení__
#### Nabíjecí cyklus
Zásadně se liší u různých typů akumulátorů. My se zde budeme podrobněji věnovat pouze Li-ion a Li-Pol, protože se s nimi můžete jako běžní uživatelé setkat nejčastěji. Pro zajímavost: olověné články mají tři fáze nabíjení a NiMH (nebo starší NiCd) jsou nabíjeny konstantním proudem za nutné kontroly maximálního nabití.

Li-ion články mají dvě fáze nabíjení popsané zde:
1. CC – konstantní proud: Rychlá část nabíjení. Probíhá do zhruba 70–80 %, kdy nabíjení přechází do fáze CV. K přechodu dochází ve chvíli, kdy článek dosáhne svého maximálního napětí (typicky ~4,2 V).
2. CV – konstantní napětí: Je výrazně pomalejší než CC. V průběhu nabíjení postupně klesá dodávaný proud během udržování stanoveného napětí článku. Jakmile proud klesne téměř na nulu, nabíjení se vypne.

## Jak na udržitelné zacházení s bateriemi
---
Z předchozích kapitol už víme, že dnešní lithiové baterie (Li-ion a Li-Pol) netrpí paměťovým efektem, ale naopak podléhají přirozenému stárnutí a opotřebení. Správnými návyky můžeme toto stárnutí výrazně zpomalit a prodloužit tak životnost baterie i o několik let.

Základní pravidla, kterými by se měl řídit každý uživatel, lze shrnout do tří bodů:
1. __Pravidlo 20–80 %:__ Lithiovým článkům dělá nejlépe, když jejich kapacitu udržujete někde uprostřed. Úplné vybití (pod 20 %) baterii stresuje a dlouhodobé držení na 100 % (například přes noc na nabíječce) ji zbytečně přetěžuje. Nejvíce baterie trpí při nabíjení v závěrečné fázi (zhruba od 80 % do 100 %), kdy do ní proud teče pod vysokým napětím.
2. __Pozor na extrémní teploty:__ Teplo je úhlavní nepřítel baterií. Nabíjení telefonu na palubní desce auta za letního dne nebo položení notebooku na měkkou peřinu, která ucpává větrání, degraduje chemii v článku rychleji než cokoliv jiného.
3. __Rychlonabíjení jen když je to nutné:__ Superrychlé nabíječky jsou skvělé, když máte 15 minut před odchodem z domu. Fyziku ale oklamat nelze – čím rychleji energii do baterie tlačíte, tím více tepla vzniká. Pro noční nabíjení nebo nabíjení v kanceláři je vždy šetrnější použít slabší, pomalejší nabíječku.

Naštěstí na to dnes nemusíte myslet sami. Výrobci do zařízení implementují chytré funkce, které úroveň nabití a s ním spojený stres regulují za vás. Zde je návod, jak automatickou péči o baterii nastavit na vašem zařízení:
#### Mám Android
Prostředí Androidu se liší podle výrobce, ale moderní telefony (zejména Samsung, Google Pixel či Motorola) už ochranu baterie nativně podporují.

__Cesta přes nastavení__ moderních zařízení: __Nastavení → Baterie → Ochrana baterie__ (nebo Péče o baterii).

V nastavení pak hledejte:
- U Pixelů: _Adaptivní nabíjení_, které telefon nabije na 100 % až těsně před tím, než vám zazvoní budík.
- U Samsungu: _Ochrana baterie_, která tvrdě zastaví nabíjení na 80 % (nebo 85 % u starších verzí systému).
#### Mám Apple (iOS)
Apple má u iPhonů správu napájení vyřešenou velmi elegantně a nabízí dvě hlavní cesty, jak baterii chránit.

__Cesta__: __Nastavení → Baterie → Kondice baterie a nabíjení__.

Zapněte _Optimalizované nabíjení_. iPhone se naučí vaší denní rutinu. Přes noc se nabije jen na 80 % a zbylých 20 % doplní až těsně před vaším probuzením. Pokud máte iPhone 15 nebo novější, najdete zde dokonce možnost _Limit 80 %_, která nedovolí baterii překročit tuto hranici za žádných okolností.
#### Mám Windows
Operační systém Windows v sobě bohužel nemá zabudovaný univerzální omezovač nabíjení. Vše závisí na výrobci vašeho notebooku. Pokud máte notebook neustále v zásuvce na stole, je omezení nabití naprosto klíčové. Právě u notebooků dochází k obrovské degradaci baterie, protože jsou neustále na 100 % v kombinaci s teplotou vznikající používáním zařízení.

>[!warning]
>Neověřeno – mělo by být ale správně (pokud někdo zkusíte, napište)

Ovládání nabíjení najdete v ovládací aplikaci výrobce (_např. Lenovo Vantage, MyASUS, DELL Power Manager nebo HP Command Center_)

V sekci Napájení (Power) hledejte režim péče o baterii, konzervační režim nebo prodloužení životnosti. Většina těchto aplikací umožňuje nastavit, aby se notebook při zapojení do sítě nabíjel maximálně na 60 % nebo 80 %.
#### Mám MacOS
MacBooky mají nativní obranu podobnou jako iPhony, což je skvělé pro běžné uživatele. Pro ty náročnější je tu ale ještě jedna cesta.

>[!warning]
>Neověřeno  – mělo by být ale správně (pokud někdo zkusíte, napište)

Otevřete __Nastavení systému → Baterie → Kondice baterie__ (ikona "i").

Zkontrolujte, že máte zapnuté _Optimalizované nabíjení_. Systém bude držet baterii na 80 % a zbytek dobije podle toho, kdy si myslí, že ho odpojíte od adaptéru.

_Tip pro náročné:_ Protože optimalizace Applu nefunguje vždy dokonale (pokud nemáte pevnou rutinu), mnoho uživatelů doporučuje aplikaci třetí strany zvanou __AlDente__. Ta vám umožní natvrdo nastavit limit nabíjení, ať děláte s Macem cokoliv.
#### Mám Linux
Uživatelé Linuxu mají nad správou napájení absolutní kontrolu, byť nastavení vyžaduje trochu práce v terminálu. Možnosti závisí primárně na tom, jaký hardware máte (tradičně nejlepší podporu mají notebooky řady ThinkPad).

Já jsem použil nástroj __TLP__.

V konfiguračním souboru (`/etc/tlp.conf`) můžete přímo definovat parametry `START_CHARGE_THRESH` (kdy má nabíjení začít) a `STOP_CHARGE_THRESH` (kdy má skončit – ideálně na 80). Pro uživatelsky přívětivější správu existují i grafická rozšíření pro desktopová prostředí GNOME nebo KDE, která vám limit dovolí naklikat přímo z lišty.

Pro zajímavost mám známého, který si nabindoval jinak nepoužívané tlačítko na klávesnici na přepnutí do režimu do 100 %, když potřebuje.
## Krátký komentář k budoucnosti baterií v EU
---
Evropská unie se v posledních letech do tématu baterií obula s nebývalou vervou. Nová unijní nařízení a směrnice se snaží tlačit na to, aby byla spotřební elektronika zelenější a udržitelnější. Tlak na snadnou vyměnitelnost baterií uživateli bez nutnosti drahých servisů, přísné cíle pro sběr starých článků a povinné kvóty na recyklaci vzácných kovů jsou kroky, které našemu životnímu prostředí nepochybně uleví.

V tomto velkém legislativním úsilí se ale bohužel trochu zapomíná na jednu mnohem levnější a elegantnější cestu – na prevenci pomocí softwaru.

Jak jsme si ukázali v předchozí kapitole, to, co baterii spolehlivě ničí, je neustálé držení na 100 % kapacity. Hardwarová řešení (jako fyzická výměna degradované baterie za novou nebo její složitá recyklace) stojí zákazníky peníze a průmysl obrovské množství energie. Přitom velkou část tohoto elektronického odpadu by šlo eliminovat pouhými několika řádky kódu.

Pokud by legislativa vedle recyklačních kvót například nařídila výrobcům povinnost zakomponovat do každého zařízení s lithiovou baterií jednoduchý a snadno přístupný přepínač pro omezení nabíjení na 80 %, prodloužila by se životnost milionů zařízení o celé roky. Dnes je tato softwarová péče (jak jsme viděli u Windows nebo Androidu) často odkázána jen na dobrou vůli konkrétních značek a nezřídka schovaná v nepřehledných aplikacích, o kterých běžný uživatel ani neví.

Sám jsem snahou pochopit udržitelné zacházení s bateriemi strávil mnoho hodin. Samozřejmě k tomu přispěla škola, kterou studuji, takže jsem si prošel i několika měřeními Li-ion článků za různých teplot apod. Takovým procesem si ale běžný uživatel neprojde.

Skutečná udržitelnost by zkrátka neměla spočívat jen v tom, jak efektivně dokážeme mrtvou baterii rozebrat a recyklovat. Měla by začínat tím, že jí pomocí dostupného a transparentního softwaru nedovolíme umřít dříve, než je to nezbytně nutné.
__Simpsonův paradox__ je jev vznikající při porovnávání dvou skupin.
>Jde o situaci, kdy se určitý trend objevuje v několika různých skupinách dat, ale jakmile se tyto skupiny spojí do jednoho celku, trend zmizí nebo se dokonce zcela obrátí.

__Matematický popis:__ ^c432d2
- může platit, že: $P(A∣B,C) > P(A∣B^′,C)$ a zároveň $P(A∣B,C^′) > P(A∣B^′,C^′)$
- ale přesto platí, že: $P(A∣B) < P(A∣B^′)$

Ukazuje nám to, jak snadné je vyvodit z dat naprosto chybný závěr, pokud ignorujeme širší kontext nebo takzvané skryté (zavádějící) proměnné.
## Historie
---
Vůbec poprvé si tohoto jevu všiml slavný britský matematik a zakladatel moderní statistiky Karl Pearson v roce __1899__. Ve své práci zaznamenal, že vztah mezi dvěma proměnnými se může dramaticky změnit, pokud do hry vstoupí třetí faktor. Jeho popis ale zapadl a nevěnovala se mu větší pozornost. [^2]

O čtyři roky později (__1903__) skotský statistik George Udny Yule tento fenomén popsal mnohem podrobněji. Zkoumal vztahy ve statistických tabulkách a všiml si, že souvislosti mezi dvěma jevy mohou zcela zmizet nebo se obrátit, když se různorodá data sloučí do jednoho balíku. Kvůli tomu se paradoxu dodnes v některých učebnicích říká __Yule-Simpsonův jev__. [^3]

Trvalo téměř padesát let, než fenomén dostal svůj dnešní základ. Zasloužil se o to britský kryptograf (který za druhé světové války pracoval v Bletchley Parku na prolamování kódů) a  statistik Edward Hugh Simpson. V roce __1951__ publikoval odborný článek, ve kterém jev velmi přesně matematicky vysvětlil. Zajímavé je, že on sám ho za "paradox" vůbec nepovažoval - bral ho prostě jako přirozenou, byť neintuitivní vlastnost čísel. [^4]

Ačkoliv Simpson jev detailně popsal v roce 1951, termín __"Simpsonův paradox"__ tehdy ještě neexistoval. Tento chytlavý název vymyslel a zpopularizoval až v roce __1972__ statistik Colin R. Blyth ve svém vlastním článku. Vybral si právě Simpsona, protože jeho vysvětlení z roku 1951 bylo do té doby nejjasnější a šlo ho snadno demonstrovat. [^5]
#### Historický příklad ^001
Přijímačky na UC Berkeley jsou nejznámější ukázkou v praxi. Jde o případ z roku __1973__ na Kalifornské univerzitě v Berkeley. Univerzita byla obviněna ze sexismu, protože celková data ukazovala jasný nepoměr:
- __Celková úspěšnost mužů:__ ~44 % přijatých.
- __Celková úspěšnost žen:__ ~35 % přijatých.
Na první pohled to vypadalo jako jasná diskriminace žen. Když se ale statistici podívali na __data podle jednotlivých fakult__, zjistili šokující věc:
- Na většině jednotlivých fakult měly ženy __stejnou nebo dokonce vyšší šanci__ na přijetí než muži.
__Jak je to možné?__ Tajemství se skrývalo ve výběru oborů. Ženy se mnohem častěji hlásily na obory, které braly jen velmi málo studentů (humanitní vědy atd.). Muži se naopak častěji hlásili na obory, do nichž bylo snazší se dostat (technické obory atd.). Když se obě tyto skupiny slily do jednoho celkového čísla, matematicky to "poškodilo" celkový průměr žen. [^1]
## Příklad
---
Zde si na jednoduchém příkladu ukážeme __Simpsonův paradox__ i s vysvětlením následné korektní reakce na data. Jedná se o test __Léku A__ a __Léku B__ na dvou skupinách pacientů.

|  Skupina pacientů  |                 Lék A                  |                 Lék B                  | Lepší hodnocení |
| :----------------: | :------------------------------------: | :------------------------------------: | :-------------: |
|  __Lehký průběh__  |   $\frac{9}{10}$ pacientů (__90 %__)   |  $\frac{85}{100}$ pacientů (__85 %__)  |    __Lék A__    |
|  __Těžký průběh__  |  $\frac{30}{100}$ pacientů (__30 %__)  |   $\frac{2}{10}$ pacientů (__20 %__)   |    __Lék A__    |
| __Celkový součet__ | $\frac{39}{110}$ pacientů (__35,5 %__) | $\frac{87}{110}$ pacientů (__79,1 %__) |    __Lék B__    |

Jak je možné, že je v každé dílčí skupině ve vedení __lék A__, ale nakonec vyhrává na plné čáře __lék B__? Důvodem je __nerovnoměrné rozložení počtu případů__.
To, že byl __lék A__ podáván spíše lidem s těžkým průběhem a __lék B__ naopak těm s lehkým, způsobilo nevyváženost celkového součtu ozdravných účinků obou léků. Tato neintuitivní skutečnost pak v posledním řádku není vidět; schová se v datech.
#### Který lék je lepší?
Teď to nejdůležitější k pochopení __Simpsonova paradoxu__; z dat jednoznačně vyplývá, že lepší je __lék A__.
Můžete si to představit jako doktor, před nímž je pacient a vy musíte rozhodnout, jaký lék podáte. Pokud jde o pacienta s __lehkým průběhem__ nemoci, větší šanci na vyléčení má __lék A__. Pokud má pacient __těžký průběh__ nemoci, větší šanci na vyléčení má __lék A__.
__Lék A je vždy lepší volbou a bude vždy dávat lepší výsledky.__
## Praktické důsledky
---
V praxi by se na první pohled mohlo zdát, že se jedná o jev podobně použitelný jako Dunning-Kruger efekt; tedy pozorování světa, které je dobré znát, ale těžko s ním něčeho docílíme. Opak je ale pravdou. __Simpsonův jev__ nám ukazuje, že naše interpretace dat není neprůstřelná.
Při analýze rozsáhlejších dat nás tento jev nutí ptát se: _"Nevynecháváme z dat náhodou něco, co by otřáslo jejich interpretací?"_ Jev nám díky tomu ukazuje __hranice vědy__ v jejím empirickém přístupu.
Příklad s léky byl hezký a ukázkový, ale v realitě často neznáme skrytou proměnnou, která hýbe s daty. I proto je součástí vědy hledání těchto skrytých proměnných. Je pak dobré mít na paměti, že nám spoustu z nich zůstává skryta..
## Zdroje
---
[^1]: BICKEL, P. J., HAMMEL, E. A., a O'CONNELL, J. W. (1975). _Sex Bias in Graduate Admissions: Data from Berkeley_. Science, 187(4175), 398–404.

[^2]: PEARSON, Karl (1899). _On the theory of genetic (reproductive) selection_. Philosophical Transactions of the Royal Society of London, Series A, 192, 257–330.

[^3]: YULE, G. Udny (1903). _Notes on the Theory of Association of Attributes in Statistics_. Biometrika, 2(2), 121–134.

[^4]: SIMPSON, Edward H. (1951). _The Interpretation of Interaction in Contingency Tables_. Journal of the Royal Statistical Society, Series B, 13(2), 238–241.

[^5]: BLYTH, Colin R. (1972). _On Simpson’s Paradox and the Sure-Thing Principle_. Journal of the American Statistical Association, 67(338), 364–366.

[[sandbox]]

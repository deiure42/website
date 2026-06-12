
## Obsah
---
1. [[#Popis|Definiční popis]]: Obsahuje výrokově korektní formu popisu, která je vyčerpávající, ale zároveň nemusí být srozumitelná.
2. [[#Historie|Historie]]: Postupný vývoj pojmu a významu s historickým příkladem.
3. [[#Příklad|Příklad a vysvětlení]]: Srozumitelná podoba a vysvětlení pojmu, která není vyčerpávající, ale zato vyniká v pochopitelnosti
4. [[#Můj názor|Můj názor]]: Důsledky a myšlenky, které z fenoménu vypichuji.
5. [[#Zdroje|Zdroje]]
## Popis
---
__Simpsonův paradox__ je jev vznikající při porovnávání dvou skupin.
>Jde o situaci, kdy se určitý trend objevuje v několika různých skupinách dat, ale jakmile se tyto skupiny spojí do jednoho celku, trend zmizí nebo se dokonce zcela obrátí.

__Matematický popis:__
- může platit, že: $P(A∣B,C) > P(A∣B^′,C)$ a zároveň $P(A∣B,C^′) > P(A∣B^′,C^′)$
- ale přesto platí, že: $P(A∣B) < P(A∣B^′)$

Ukazuje nám to, jak snadné je vyvodit z dat naprosto chybný závěr, pokud ignorujeme širší kontext nebo takzvané skryté (zavádějící) proměnné.
## Historie
---
Vůbec poprvé si tohoto jevu všiml slavný britský matematik a zakladatel moderní statistiky Karl Pearson v roce __1899__. Ve své práci zaznamenal, že vztah mezi dvěma proměnnými se může dramaticky změnit, pokud do hry vstoupí třetí faktor. Jeho popis ale zapadl a nevěnovala se mu větší pozornost. [^2]

O čtyři roky později (__1903__) skotský statistik George Udny Yule tento fenomén popsal mnohem podrobněji. Zkoumal vztahy ve statistických tabulkách a všiml si, že souvislosti mezi dvěma jevy mohou zcela zmizet nebo se obrátit, když se různorodá data sloučí do jednoho balíku. Kvůli tomu se paradoxu dodnes v některých učebnicích říká __Yule-Simpsonův jev__. [^3]

Trvalo téměř padesát let, než fenomén dostal svůj dnešní základ. Zasloužil se o to britský statistik a kryptograf Edward Hugh Simpson, který za druhé světové války pracoval v Bletchley Parku na prolamování kódů. V roce __1951__ publikoval odborný článek, ve kterém jev velmi přesně matematicky vysvětlil. Zajímavé je, že on sám ho za "paradox" vůbec nepovažoval - bral ho prostě jako přirozenou, byť neintuitivní vlastnost čísel. [^4]

Ačkoliv Simpson jev detailně popsal v roce 1951, termín __"Simpsonův paradox"__ tehdy ještě neexistoval. Tento chytlavý název vymyslel a zpopularizoval až v roce __1972__ statistik Colin R. Blyth ve svém vlastním článku. Vybral si právě Simpsona, protože jeho vysvětlení z roku 1951 bylo do té doby nejjasnější a šlo ho snadno demonstrovat. [^5]
#### Historický příklad
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
__To, že byl lék A podáván spíše lidem s těžkým průběhem a lék B naopak těm s lehkým, způsobilo nevyváženost celkového součtu ozdravných účinků obou léků.__ Tato neintuitivní skutečnost pak v posledním řádku není vidět; schová se v datech.
#### Který lék je lepší?
Teď to nejdůležitější k pochopení __Simpsonova paradoxu__; z dat jednoznačně vyplývá, že lepší je __lék A__.
Můžete si to představit jako doktor, před nímž je pacient a vy musíte rozhodnout, jaký lék podáte. Pokud jde o pacienta s __lehkým průběhem__ nemoci, větší šanci na vyléčení má __lék A__. Pokud má pacient __těžký průběh__ nemoci, větší šanci na vyléčení má __lék A__.
__Lék A je vždy lepší volbou a bude vždy dávat lepší výsledky.__
## Můj názor
---
Je samo o sobě paradoxní, že se Simpsonův jev nejčastěji nazývá Simpsonovým paradoxem. Přitom se jedná jen o relativně zřejmou vlastnost datových skupin a jejich rozdělení, které nevyhnutelně podléhá __matematice vektorů a proložení křivek__. Přesto ale jde o jednu z těch věcí, které se laikům (těm, kdo nejsou sběhlí ve znalosti statistiky) zdá paradoxní.

__Jde snadno vysvětlit a ukázat__ na datech za použití __násobení a sčítání zlomků__. Zároveň směřuje pozornost čtenářů studií a statistik směrem, který laiky nenapadne; ke škálám, na nichž se data měří. Svou jednoduchostí nám může naznačit __část hranic vědy__. V příkladu s léky použitém v článku výše ([[#Příklad|tady]]) je nám všem jasné, jak by se dalo "očistit" data. Co když to ale zřejmé není?

Myslím na historické __reálie eugeniky a jiných vědeckých oborů__, které dnes označujeme za zcestné, ve své době šlo však za legitimní disciplíny jako je pro nás dnes třeba pedagogická psychologie.

Snad nejdůležitější věc, kterou nám __Simpsonův paradox__ ukazuje, je, že někdy na počtu dat prostě nezáleží. Kdyby neexistovalo třídění pacientů na ty s lehkým a těžkým průběhem, vědeckou metodou bychom nijak nezjistili, že je __Lék A__ vůbec někdy efektivnější než __Lék B__.
## Zdroje
[^1]: Bickel, P. J., Hammel, E. A., & O'Connell, J. W. (1975). Sex bias in graduate admissions: Data from Berkeley. Science, 187(4175), 398–404.

[^2]: Pearson, K. (1899). On the theory of genetic (reproductive) selection. Philosophical Transactions of the Royal Society of London, Series A, 192, 257–330.

[^3]: Yule, G. U. (1903). Notes on the theory of association of attributes in statistics. Biometrika, 2(2), 121–134.

[^4]: Simpson, E. H. (1951). The interpretation of interaction in contingency tables. Journal of the Royal Statistical Society, Series B, 13(2), 238–241.

[^5]: Blyth, C. R. (1972). On Simpson’s paradox and the sure-thing principle. Journal of the American Statistical Association, 67(338), 364–366.

# Dlaczego V8 to najlepszy silnik na świecie — scenariusz lektora

Format: pion 1080×1920, ok. 66 s. Tempo jak w „panewkach” (~3,3 słowa/s), ton pewny, lekko zaczepny.
Czasy obok każdej sceny to obecne ustawienie klipów w `index.html`. Po nagraniu lektora przesuń/rozciągnij
sceny w Studio pod realne słowa (każda scena ma własną oś czasu, więc animacje jadą razem z klipem).
Znaczniki `[≈x.x s]` to momenty w scenie, pod które są już podpięte animacje.

---

## S1 · Hook — 0:00–0:06,5 (`s1-hook`)
> Są silniki mocniejsze. `[≈1.2 s]` Są oszczędniejsze. `[≈2.4 s]` Ale żaden nie jedzie jak… `[≈3.3 s]` **V8.**
> `[≈4.6 s]` I to nie jest magia. To czysta geometria.

## S2 · Układ 90° — 0:06,5–0:14,5 (`s2-uklad`)
> Osiem cylindrów, dwa rzędy po cztery, `[≈1.2 s]` rozchylone pod kątem dziewięćdziesięciu stopni.
> `[≈3.9 s]` Silnik jest krótki i niski, `[≈6.0 s]` więc mieści się tam, gdzie rzędowa ósemka nie miałaby szans.

## S3 · Zapłony co 90° — 0:14,5–0:23,5 (`s3-zaplony`)
> Pełny cykl to dwa obroty wału, siedemset dwadzieścia stopni. `[≈3.3 s]` Czwórka odpala co sto osiemdziesiąt.
> `[≈5.3 s]` V8 — co dziewięćdziesiąt. `[≈6.5 s]` Wał dostaje kopa dwa razy częściej, więc moment płynie równo, bez szarpania.

## S4 · Wał krzyżowy — 0:23,5–0:32,5 (`s4-wal`)
> Sekret siedzi w wale. Wykorbienia co dziewięćdziesiąt stopni — `[≈3.6 s]` patrząc od przodu, układają się w krzyż.
> `[≈5.6 s]` Z przeciwwagami siły się znoszą, `[≈7.4 s]` a silnik pracuje prawie tak gładko jak V12.

## S5 · Bulgot — 0:32,5–0:42,5 (`s5-bulgot`)
> A ten bulgot? `[≈1.2 s]` Kolejność zapłonów: jeden, osiem, cztery, trzy, sześć, pięć, siedem, dwa.
> `[≈5.2 s]` W każdym rzędzie odstępy między zapłonami są nierówne.
> `[≈7.6 s]` Wydech dostaje nieregularne pulsy — i właśnie to słyszysz.

## S6 · Moment i prostota — 0:42,5–0:50 (`s6-moment`)
> Duża pojemność daje moment od samego dołu, `[≈2.3 s]` bez czekania na turbo.
> `[≈3.6 s]` A klasyczny rozrząd OHV to mało części `[≈5.7 s]` i silnik, który wytrzyma naprawdę dużo.

## S7 · Historia — 0:50–0:57,5 (`s7-historia`)
> Cadillac, rok 1914. `[≈1.6 s]` Ford Flathead — 1932. `[≈3.2 s]` Chevrolet small block — 1955.
> `[≈5.0 s]` Od ponad stu lat V8 napędza wszystko: `[≈5.9 s]` od pickupów, przez muscle cary, po Formułę 1.

## S8 · Outro — 0:57,5–1:06,5 (`s8-outro`)
> Nie jest najlżejszy. `[≈1.3 s]` Nie jest najoszczędniejszy.
> `[≈2.9 s]` Ale jeśli pytasz, który silnik jest najlepszy na świecie — `[≈5.2 s]` po prostu posłuchaj.
> `[≈6.5 s]` A ty? V8 czy turbo czwórka? Napisz w komentarzu.

---

## Po nagraniu lektora
1. Wrzuć plik do `assets/vo.mp3` i dodaj w `index.html` (w miejscu komentarza „Lektor”):
   `<audio id="vo" src="assets/vo.mp3" data-start="0" data-duration="66.5" data-track-index="30"></audio>`
2. `npx hyperframes transcribe assets/vo.mp3` → słowa z czasami (do napisów i do dosunięcia scen).
3. W Studio (`npm run dev`) dopasuj start/długość klipów scen do słów; w razie potrzeby przesuń pojedyncze
   znaczniki w skryptach scen (`compositions/*.html`, liczby w `tl.to(..., <czas>)`).
4. W miejsce ciszy pod „posłuchaj” (S8, ≈5,2 s) warto wkleić 2–3 s prawdziwego dźwięku V8.

## Fakty użyte w tekście
- 90° V8, 2×4 cylindry; cykl 4-suwowy = 720° wału → zapłon co 720/8 = 90° (R4: co 180°).
- Wał cross-plane: wykorbienia co 90° (widok od przodu = krzyż); z przeciwwagami wyważone siły 1. i 2. rzędu.
- Kolejność zapłonów GM small block: 1-8-4-3-6-5-7-2; w każdym rzędzie odstępy 90/180/270° → nierówne pulsy wydechu.
- Cadillac V8 (1914), Ford Flathead V8 (1932), Chevrolet small block (1955), F1 z silnikami V8 (m.in. 2006–2013).
- Krzywe momentu w S6 są poglądowe, bez skali.

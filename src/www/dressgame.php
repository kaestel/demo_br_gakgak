<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
<!DOCTYPE html>
<html lang="da">
<head>
	<!-- (c) & (p) hvadhedderde.com 2011 //-->
	<!-- All material protected by copyrightlaws, as if you didnt know //-->
	<title>BR GaKGaK</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0;" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<? if($_SESSION["dev"]) { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $_SESSION["segment"] ?>_include.css" />
		<script type="text/javascript" src="/js/lib/seg_<?= $_SESSION["segment"] ?>_include.js"></script>
	<? } else { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $_SESSION["segment"] ?>.css" />
		<script type="text/javascript" src="/js/seg_<?= $_SESSION["segment"] ?>.js"></script>
	<? } ?>

</head>

<body class="i:validdevice">

<div id="page" class="i:page">

	<div id="header"></div>

	<div id="content" class="dressgame">
		<div class="scene i:dressgame">
			
			<h1>Leg GAK GAK i udklædningskassen</h1>
			
			<div class="info">
				<h2>Legen:</h2>
				<p>Find udklædningskassen eller bare en bunke sjovt gammelt tøj frem, som I må låne som udklædningstøj. Slip fantasien løs med de ting I har: Brug f.eks. vanter som ører, tørklæder som kjoler, en plastikskål som styrthjelm, osv.</p>
				
				<h2>Sådan gør I:</h2>
				<p>Klik på 'Find kostume'. Så finder kostumemaskinen to  udklædninger frem, som I hver især skal udklæde jer som. Herefter har I højest 2 min. til at klæde jer ud fra det øjeblik, I sætter uret i gang. Den, der bliver først færdig med sin udklædning, har vundet.</p>
				
				<div class="findcostume">
					<a>Find kostume</a>
				</div>
			</div>
			
			<ul class="outfits">
				<li class="outfit red">
					<ul class="picker">
						<li class="header">
							<ul class="costume">
								<li class="askepot">Askepot</li>
    						<li class="batman">Batman</li>
    						<li class="bokser">Bokser</li>
    						<li class="brud">Brude</li>
    						<li class="buzz">Buzz Lightyear</li>
    						<li class="cars">Cars</li>
    						<li class="clone">Clone Trooper</li>
    						<li class="cowboy">Cowboy</li>
    						<li class="darth">Darth Vader</li>
    						<li class="handy">Handy Manny</li>
    						<li class="hanna">Hannah Montana</li>
    						<li class="hawaii">Hawaii</li>
    						<li class="heat">Heatblast</li>
    						<li class="jordbaer">Jordbær</li>
    						<li class="kanin">Kanin</li>
    						<li class="klokkeblomst">Klokkeblomst</li>
    						<li class="klovn">Klovne</li>
    						<li class="laege">Læge</li>
    						<li class="loeve">Løve</li>
    						<li class="mickey">minnie Mouse</li>
    						<li class="ninja">Ninja</li>
    						<li class="pippi">Pippi</li>
    						<li class="politi">Politi</li>
    						<li class="ridder">Ridder</li>
    						<li class="samurai">Samurai</li>
    						<li class="smoelf">Smølfe</li>
    						<li class="snehvide">Snehvide</li>
    						<li class="spiderman">Spider-man</li>
    						<li class="sygeplejerske">Sygeplejerske</li>
    						<li class="tornerose">Tornerose</li>
    						<li class="trold">Trolde</li>
							</ul>
						</li>
						<li class="body">
							<ul class="costume">
								<li class="askepot">Askepot</li>
    						<li class="barbapapa">Barbapapa</li>
    						<li class="batman">Batman</li>
    						<li class="bokser">Bokser</li>
    						<li class="brud">Brude</li>
    						<li class="buzz">Buzz Lightyear</li>
    						<li class="cars">Cars</li>
    						<li class="clone">Clone Trooper</li>
    						<li class="cowboy">Cowboy</li>
    						<li class="darth">Darth Vader</li>
    						<li class="handy">Handy Manny</li>
    						<li class="hanna">Hannah Montana</li>
    						<li class="hawaii">Hawaii</li>
    						<li class="heat">Heatblast</li>
    						<li class="kanin">Kanin</li>
    						<li class="klokkeblomst">Klokkeblomst</li>
    						<li class="klovn">Klovne</li>
    						<li class="laege">Læge</li>
    						<li class="mickey">Minnie Mouse</li>
    						<li class="ninja">Ninja</li>
    						<li class="pippi">Pippi</li>
    						<li class="politi">Politi</li>
    						<li class="prinsesse">Prinsesse</li>
    						<li class="ridder">Ridder</li>
    						<li class="samurai">Samurai</li>
    						<li class="smoelf">Smølfe</li>
    						<li class="snehvide">Snehvide</li>
    						<li class="spiderman">Spider-man</li>
    						<li class="sygeplejerske">Sygeplejerske</li>
    						<li class="tornerose">Tornerose</li>
							</ul>
						</li>
						<li class="footer">
							<ul class="costume">
								<li class="askepot">Askepot</li>
    						<li class="batman">Batman</li>
    						<li class="bokser">Bokser</li>
    						<li class="brud">Brud</li>
    						<li class="buzz">Buzz Lightyear</li>
    						<li class="cars">Cars</li>
    						<li class="clone">Clone Trooper</li>
    						<li class="cowboy">Cowboy</li>
    						<li class="darth">Darth Vader</li>
    						<li class="handy">Handy Manny</li>
    						<li class="hanna">Hannah Montana</li>
    						<li class="hawaii">Hawaii</li>
    						<li class="heat">Heatblast</li>
    						<li class="kanin">Kanin</li>
    						<li class="klokkeblomst">Klokkeblomst</li>
    						<li class="klovn">Klovn</li>
    						<li class="mickey">Minnie Mouse</li>
    						<li class="ninja">Ninja</li>
    						<li class="pippi">Pippi</li>
    						<li class="politi">Politi</li>
    						<li class="prinsesse">Prinsesse</li>
    						<li class="ridder">Ridder</li>
    						<li class="samurai">Samurai</li>
    						<li class="smoelf">Smølf</li>
    						<li class="snehvide">Snehvide</li>
    						<li class="spiderman">Spider-man</li>
    						<li class="sygeplejerske">Sygeplejerske</li>
    						<li class="tornerose">Tornerose</li>
							</ul>
						</li>
					</ul>
					
					<div class="frame"></div>
					<div class="sign"></div>
					
					<div class="pickertext small">
						<p>Cowboy - Klovne - Prinsesse</p>
					</div>
				</li>
				
				<li class="outfit blue">
					<ul class="picker">
						<li class="header">
							<ul class="costume">
								<li class="askepot">Askepot</li>
    						<li class="batman">Batman</li>
    						<li class="bokser">Bokser</li>
    						<li class="brud">Brude</li>
    						<li class="buzz">Buzz Lightyear</li>
    						<li class="cars">Cars</li>
    						<li class="clone">Clone Trooper</li>
    						<li class="cowboy">Cowboy</li>
    						<li class="darth">Darth Vader</li>
    						<li class="handy">Handy Manny</li>
    						<li class="hanna">Hannah Montana</li>
    						<li class="hawaii">Hawaii</li>
    						<li class="heat">Heatblast</li>
    						<li class="jordbaer">Jordbær</li>
    						<li class="kanin">Kanin</li>
    						<li class="klokkeblomst">Klokkeblomst</li>
    						<li class="klovn">Klovne</li>
    						<li class="laege">Læge</li>
    						<li class="loeve">Løve</li>
    						<li class="mickey">minnie Mouse</li>
    						<li class="ninja">Ninja</li>
    						<li class="pippi">Pippi</li>
    						<li class="politi">Politi</li>
    						<li class="ridder">Ridder</li>
    						<li class="samurai">Samurai</li>
    						<li class="smoelf">Smølfe</li>
    						<li class="snehvide">Snehvide</li>
    						<li class="spiderman">Spider-man</li>
    						<li class="sygeplejerske">Sygeplejerske</li>
    						<li class="tornerose">Tornerose</li>
    						<li class="trold">Trolde</li>
							</ul>
						</li>
						<li class="body">
							<ul class="costume">
								<li class="askepot">Askepot</li>
    						<li class="barbapapa">Barbapapa</li>
    						<li class="batman">Batman</li>
    						<li class="bokser">Bokser</li>
    						<li class="brud">Brude</li>
    						<li class="buzz">Buzz Lightyear</li>
    						<li class="cars">Cars</li>
    						<li class="clone">Clone Trooper</li>
    						<li class="cowboy">Cowboy</li>
    						<li class="darth">Darth Vader</li>
    						<li class="handy">Handy Manny</li>
    						<li class="hanna">Hannah Montana</li>
    						<li class="hawaii">Hawaii</li>
    						<li class="heat">Heatblast</li>
    						<li class="kanin">Kanin</li>
    						<li class="klokkeblomst">Klokkeblomst</li>
    						<li class="klovn">Klovne</li>
    						<li class="laege">Læge</li>
    						<li class="mickey">Minnie Mouse</li>
    						<li class="ninja">Ninja</li>
    						<li class="pippi">Pippi</li>
    						<li class="politi">Politi</li>
    						<li class="prinsesse">Prinsesse</li>
    						<li class="ridder">Ridder</li>
    						<li class="samurai">Samurai</li>
    						<li class="smoelf">Smølfe</li>
    						<li class="snehvide">Snehvide</li>
    						<li class="spiderman">Spider-man</li>
    						<li class="sygeplejerske">Sygeplejerske</li>
    						<li class="tornerose">Tornerose</li>
							</ul>
						</li>
						<li class="footer">
							<ul class="costume">
								<li class="askepot">Askepot</li>
    						<li class="batman">Batman</li>
    						<li class="bokser">Bokser</li>
    						<li class="brud">Brud</li>
    						<li class="buzz">Buzz Lightyear</li>
    						<li class="cars">Cars</li>
    						<li class="clone">Clone Trooper</li>
    						<li class="cowboy">Cowboy</li>
    						<li class="darth">Darth Vader</li>
    						<li class="handy">Handy Manny</li>
    						<li class="hanna">Hannah Montana</li>
    						<li class="hawaii">Hawaii</li>
    						<li class="heat">Heatblast</li>
    						<li class="kanin">Kanin</li>
    						<li class="klokkeblomst">Klokkeblomst</li>
    						<li class="klovn">Klovn</li>
    						<li class="mickey">Minnie Mouse</li>
    						<li class="ninja">Ninja</li>
    						<li class="pippi">Pippi</li>
    						<li class="politi">Politi</li>
    						<li class="prinsesse">Prinsesse</li>
    						<li class="ridder">Ridder</li>
    						<li class="samurai">Samurai</li>
    						<li class="smoelf">Smølf</li>
    						<li class="snehvide">Snehvide</li>
    						<li class="spiderman">Spider-man</li>
    						<li class="sygeplejerske">Sygeplejerske</li>
    						<li class="tornerose">Tornerose</li>
							</ul>
						</li>
					</ul>
					
					<div class="frame"></div>
					<div class="sign"></div>
					
					<div class="pickertext small">
						<p>Cowboy - Klovne - Prinsesse</p>
					</div>
				</li>
			</ul>

			<div class="gameclock i:gameclock">
				<ul class="clock">
					<li class="full selected"></li>
					<li class="threequaters"></li>
					<li class="half"></li>
					<li class="quarter"></li>
					<li class="empty"></li>
				</ul>
				<div class="startgame">
					<a>Start tiden</a>
				</div>
			</div>

			<div class="gameend">
				<h2>Tiden er gået</h2>
				<div class="playover">
					<a>Spil igen</a>
				</div>
			</div>
			<div class="back">
				<a href="choose.php">Tilbage</a>
			</div>
			<div class="logo">
				<a href="index.php"></a>
			</div>
		</div>
	</div>

	<div id="footer"></div>

</div>

</body>
</html>
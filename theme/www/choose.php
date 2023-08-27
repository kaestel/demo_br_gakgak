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
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" /-->
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

	<div id="content" class="choose">
		<div class="scene i:choose">
			<h1>Hvad vil du være til fastelavn</h1>
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
						<li class="mickey">Minnie Mouse</li>
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
			<ul class="arrows">
				<li class="header left">previous header</li>
				<li class="body left">previous body</li>
				<li class="footer left">previous footer</li>
				<li class="header right">next header</li>
				<li class="body right">next body</li>
				<li class="footer right">next footer</li>
			</ul>

			<div class="pickertext">
				<p>Cowboy - Klovne - Prinsesse</p>
			</div>

			<div class="pick">
				<a href="picked.php">Det vil jeg være</a>
			</div>
			<div class="infobutton">
				<a href="info.php">Sådan spiller du</a>
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
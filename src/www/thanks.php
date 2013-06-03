<? include_once($_SERVER['FRAMEWORK_PATH']."/include/segment.php") ?>
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

	<? if($_SESSION["dev_includes"]) { ?>
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

	<div id="content" class="thanks">
		<div class="scene i:thanks">
			<h1>Tak for din deltagelse</h1>
			
			<div class="text">
				<p>Tusind tak fordi dit bud på en gakket udklædning. Du er nu med lodtrækningen om et gavekort på 3000 kr. Bliver det dig, der vinder, får du direkte besked d. x.x. 2012.</p>
				
				<p class="notmember" id="notmember_link"><a href="http://www.br.dk/Club%20BR.aspx" class="close" target="_blank">Er du ikke medlem af Club BR? Bliv medlem her</a></p>
				
				<div id="clubbr">
					<a href="http://www.br.dk/Club%20BR.aspx">Bliv medlem af CLUB BR her</a>
				</div>
				
				<div class="collection">
					<a href="http://www.br.dk/Kategorier/Fastelavnsdragter.aspx?icid=_text_gakgakgame_costumes_q1_20012012_button">Se alle dragter</a>
				</div>
				
				<div class="tips">
					<a href="http://www.br.dk/Special%20pages/Fastelavn.aspx?icid=_text_gakgakgame_tips_q1_20012012_button">Få gode tips til fastelavn</a>
				</div>
			</div>
			
			<div class="start">
				<a href="dressgame.php">Leg videre her</a>
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
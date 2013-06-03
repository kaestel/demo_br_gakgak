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

	<div id="content">
		<div class="overlay info">
			<div class="scene i:info">
			
				<div class="text">
					<h2>Kort om konkurrencen</h2>
					<p>Brug gakgak-udklædningsmaskinen her på siden til at sammensætte en gakket og sjov fastelavnsudklædning. Så er du med i lodtrækningen om et gavekort til Fætter BR på 3.000 kr.</p>
					<p>Laver du en skør og opfindsom dragt, som f.eks. en prinsesse-cowboy-smølf eller politi-ridder-ninja, er det måske dig, der løber med 1.-præmien.</p>
					
					<h2>Sådan spiller du..</h2>
					<ol>
						<li>Tryk på knappen 'Start spillet'.</li>
						<li>Ved hjælp af gakgak-udklædningsmaskinen sammensætter du den mest vanvittige og gakkede udklædning, verden nogensinde har set. Når du er tilfreds med resultatet, trykker du på knappen 'Det vil jeg være'.</li>
						<li>Derefter trykker du på knappen ’Send ind’ og udfylder skemaet med dit navn og din e-mail-adresse. Så sendes billedet af din gakkede udklædning automatisk sammen med din e-mail.</li>
						<li>Nu er du med i konkurrencen om et gavekort på 3.000 kr. til Fætter BR. Vinderen findes ved lodtrækning blandt alle indsendte udklædninger. Og bliver det dig, får du direkte besked 21. februar 2012.</li>
					</ol>
				
					<h2>Regler for deltagelse:</h2>
					<p>TOP-TOYs egne medarbejdere må ikke deltage. Sidste frist for deltagelse i konkurrencen er søndag 19. februar 2012.</p>
				</div>
			
				<div class="close"><a href="choose.php">Luk</a></div>

			</div>
		</div>
	</div>

	<div id="footer"></div>

</div>

</body>
</html>
# Reproducible, font-outlined SVG and 3600px transparent PNG of the supplied identity.
# This draws from the vector geometry; it does not modify the client's reference image.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetDirectory = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public/brand'))
[IO.Directory]::CreateDirectory($assetDirectory) | Out-Null
$canvas = New-Object Drawing.Bitmap(3600,1620)
$graphics = [Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.ScaleTransform(3,3)
$ink = New-Object Drawing.Drawing2D.LinearGradientBrush([Drawing.Point]::new(0,0),[Drawing.Point]::new(1200,540),[Drawing.ColorTranslator]::FromHtml('#EED38A'),[Drawing.ColorTranslator]::FromHtml('#B58528'))
$pen = New-Object Drawing.Pen($ink,4.62)
$graphics.DrawEllipse($pen,533.78,27.7,132.44,132.44)
$graphics.FillEllipse($ink,572.28,83.14,77,77)
$measure = [Drawing.Graphics]::FromImage([Drawing.Bitmap]::new(1,1))
$invariant = [Globalization.CultureInfo]::InvariantCulture
function Number([double]$value) { $value.ToString('0.###',$invariant) }
function Get-PathData($path) {
  $points=$path.PathPoints; $types=$path.PathTypes; $commands=[Collections.Generic.List[string]]::new()
  for ($j=0; $j -lt $points.Length; $j++) {
    $kind=$types[$j] -band 7
    if ($kind -eq 0) { $commands.Add('M'+(Number $points[$j].X)+' '+(Number $points[$j].Y)) }
    elseif ($kind -eq 1) { $commands.Add('L'+(Number $points[$j].X)+' '+(Number $points[$j].Y)) }
    elseif ($kind -eq 3) {
      $commands.Add('C'+(Number $points[$j].X)+' '+(Number $points[$j].Y)+' '+(Number $points[$j+1].X)+' '+(Number $points[$j+1].Y)+' '+(Number $points[$j+2].X)+' '+(Number $points[$j+2].Y))
      $j+=2
    }
    if (($types[$j] -band 128) -ne 0) { $commands.Add('Z') }
  }
  $commands -join ' '
}
function Add-OutlinedText([string]$text,[string]$family,[single]$size,[single]$tracking,[single]$top) {
  $fontFamily=[Drawing.FontFamily]::new($family)
  $font=[Drawing.Font]::new($fontFamily,$size,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel)
  $path=[Drawing.Drawing2D.GraphicsPath]::new()
  [single]$advance=0
  foreach($character in $text.ToCharArray()) {
    if ($character -eq ' ') { $advance += $size * 0.30 + $tracking; continue }
    $path.AddString([string]$character,$fontFamily,0,$size,[Drawing.PointF]::new($advance,0),[Drawing.StringFormat]::GenericTypographic)
    $advance += $measure.MeasureString([string]$character,$font,10000,[Drawing.StringFormat]::GenericTypographic).Width + $tracking
  }
  $bounds=$path.GetBounds()
  $transform=[Drawing.Drawing2D.Matrix]::new()
  $transform.Translate(600-$bounds.X-$bounds.Width/2,$top-$bounds.Y)
  $path.Transform($transform)
  $graphics.FillPath($ink,$path)
  $data=Get-PathData $path
  $path.Dispose(); $font.Dispose(); $fontFamily.Dispose(); $transform.Dispose()
  '<path d="'+$data+'"/>'
}
$wordmark=Add-OutlinedText 'WELCOME WOODS' 'Times New Roman' 93 3 220
$interior=Add-OutlinedText 'INTERIOR' 'Times New Roman' 41 18 326
$tagline=Add-OutlinedText 'DESIGNING SPACES. CREATING EXPERIENCES.' 'Arial' 21 5 440
$thinPen=[Drawing.Pen]::new($ink,1.5)
$graphics.DrawLine($thinPen,235,342,400,342); $graphics.DrawLine($thinPen,801,342,966,342)
$graphics.DrawLine($thinPen,280,405,578,405); $graphics.DrawLine($thinPen,622,405,920,405)
$diamond=[Drawing.PointF[]]@([Drawing.PointF]::new(600,394),[Drawing.PointF]::new(611,405),[Drawing.PointF]::new(600,416),[Drawing.PointF]::new(589,405))
$graphics.FillPolygon($ink,$diamond)
$svg='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="540" viewBox="0 0 1200 540" preserveAspectRatio="xMidYMid meet"><title>Welcome Woods Interior</title><defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#EED38A"/><stop offset="1" stop-color="#B58528"/></linearGradient></defs><g fill="url(#gold)"><circle cx="600" cy="93.92" r="66.22" fill="none" stroke="url(#gold)" stroke-width="4.62"/><circle cx="610.78" cy="121.64" r="38.5"/>'+$wordmark+$interior+$tagline+'<path d="M600 394l11 11-11 11-11-11z"/><path d="M235 342H400M801 342H966M280 405H578M622 405H920" fill="none" stroke="url(#gold)" stroke-width="1.5"/></g></svg>'
[IO.File]::WriteAllText((Join-Path $assetDirectory 'welcome-woods-logo-outlined.svg'),$svg,[Text.UTF8Encoding]::new($false))
$canvas.Save((Join-Path $assetDirectory 'welcome-woods-logo-3600.png'),[Drawing.Imaging.ImageFormat]::Png)
$thinPen.Dispose(); $pen.Dispose(); $ink.Dispose(); $graphics.Dispose(); $canvas.Dispose(); $measure.Dispose()
Write-Output 'Exported outlined SVG and transparent 3600 x 1620 PNG in public/brand.'

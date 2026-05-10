!macro cleanAlignedUserData
  DetailPrint "Removing old Aligned Financials local app data"
  RMDir /r "$APPDATA\aligned-financials-desktop"
  RMDir /r "$APPDATA\Aligned Financials"
  RMDir /r "$APPDATA\Alligned Financials"
!macroend

!macro customInstall
  ${if} $installMode == "all"
    SetShellVarContext current
    !insertmacro cleanAlignedUserData
    SetShellVarContext all
  ${else}
    !insertmacro cleanAlignedUserData
  ${endif}
!macroend

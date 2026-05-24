
local tabletAberto = false

RegisterCommand("tabletpublico", function()
    tabletAberto = not tabletAberto

    SetNuiFocus(tabletAberto, tabletAberto)

    SendNUIMessage({
        action = tabletAberto and "open" or "close"
    })

    if tabletAberto then
        ExecuteCommand("e tablet")
    else
        ClearPedTasks(PlayerPedId())
    end
end)

RegisterKeyMapping('tabletpublico', 'Abrir Tablet Publico', 'keyboard', '0')

RegisterNUICallback("fechar", function(data, cb)
    tabletAberto = false

    SetNuiFocus(false, false)

    SendNUIMessage({
        action = "close"
    })

    ClearPedTasks(PlayerPedId())

    cb("ok")
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

        if tabletAberto then
            DisableControlAction(0, 1, true)
            DisableControlAction(0, 2, true)
            DisableControlAction(0, 142, true)
            DisableControlAction(0, 18, true)
            DisableControlAction(0, 322, true)
            DisableControlAction(0, 106, true)
        end
    end
end)

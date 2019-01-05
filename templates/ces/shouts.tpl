<!-- BEGIN shouts -->
<!-- IF !shouts.isChained -->
<a class="ces-avatar {shouts.user.status} {shouts.typeClasses}" href="/user/{shouts.user.userslug}" data-uid="{shouts.fromuid}">
    <!-- IF shouts.user.picture -->
    <img class="ces-avatar-image" title="{shouts.user.username}" src="{shouts.user.picture}"/>
    <!-- ELSE -->
    <div class="ces-avatar-icon user-icon" title="{shouts.user.username}" style="background-color: {shouts.user.icon:bgColor};">{shouts.user.icon:text}</div>
    <!-- ENDIF shouts.user.picture -->
    <div class="ces-avatar-overlay">
        <span class="ces-avatar-typing">
            <i class="text-muted fa fa-keyboard-o"></i>
        </span>
    </div>
</a>

<div class="ces-user {shouts.typeClasses}" data-uid="{shouts.fromuid}">
    <a href="/user/{shouts.user.userslug}">{shouts.user.username}</a>
    <span class="ces-shout-timestamp">
        <small class="text-muted"><i class="fa fa-clock-o"></i> <span class="timeago timeago-update" title="{shouts.timeString}"></span> </small>
    </span>
</div>
<!-- ENDIF !shouts.isChained -->

<div class="ces-shout {shouts.typeClasses}" data-sid="{shouts.sid}" data-uid="{shouts.fromuid}">
    <div class="ces-shout-text">{shouts.content}</div>

    <!-- IF shouts.user.isMod -->
    <div class="ces-shout-options">
        <a href="#" class="ces-shout-option-edit fa fa-pencil"></a>
        <a href="#" class="ces-shout-option-close fa fa-trash-o"></a>
    </div>
    <!-- ENDIF shouts.user.isMod -->
</div>
<!-- END shouts -->
OV.HashHandler = class
{
    constructor ()
    {
        this.skipNextEvent = false;
        this.eventListener = null;
    }

    SetEventListener (eventListener)
    {
        this.eventListener = eventListener;
        window.onhashchange = this.OnChange.bind (this);
    }

    SkipNextEventHandler ()
    {
        this.skipNextEvent = true;
    }

    HasHash ()
    {
        let hash = this.GetHash ();
        return hash.length > 0;
    }

    ClearHash ()
    {
        this.SetHash ('');
    }

    GetCameraFromHash ()
    {
        let parser = OV.CreateUrlParser (this.GetHash ());
        return parser.GetCamera ();
    }

    GetModelFilesFromHash ()
    {
        let parser = OV.CreateUrlParser (this.GetHash ());
        return parser.GetModelUrls ();
    }

    SetModelFilesToHash (files)
    {
        let params = OV.CreateUrlParameters (files, null);
        this.SetHash (params);
    }

    GetHash ()
    {
        return window.location.hash.substr (1);
    }

    SetHash (hash)
    {
        window.location.hash = hash;
    }

    OnChange ()
    {
        if (this.skipNextEvent) {
            this.skipNextEvent = false;
            return;
        }
        this.eventListener ();
    }
};
